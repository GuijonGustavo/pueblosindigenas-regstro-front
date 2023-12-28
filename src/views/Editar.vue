<template>
  <div>
    <div class="container m-y-2">

        <h1 class="titulo">Editar información sobre pueblos</h1>

        <p class="instrucciones m-t-1 m-b-0">Selecciona un pueblo para editar sus secciones</p>

        <div class="fila">
          <div class="columna">
            <label class="etiqueta" for="pueblo">Pueblo</label>
            <select class="selector" @change="cambiarPueblo()" v-model="puebloSeleccionado" id="pueblo">
              <option value="0">Selcciona un pueblo</option>
              <option v-for="pueblo in pueblos" :key="pueblo.id" :value="pueblo">{{ pueblo.nombre | capitalize }}</option>
            </select>
          </div>
          <div class="columna">
            <label class="etiqueta" for="seccion">Sección</label>
            <select :disabled="seccionDisabled" class="selector" @change="cambiarSeccion()" v-model="seccionSeleccionado" id="seccion">
              <option value="0">Selecciona una sección de contenido</option>
              <option v-for="seccion in diccionarioSeccion" :key="seccion.clave" :value="seccion">{{ seccion.nombre | capitalize }}</option>
            </select>
          </div>
        </div>

        <div id="contenidoPueblo">
          <div class="etiqueta">Texto de la sección</div>
          <p>
            <button v-on:click="alternaEdicion"  >{{textoAlternarEdicion}}</button>
            {{ textoAlternarEdicion2}}
          </p>
          <div class="box">
            <trumbowyg id="informacion" v-model="content_editado" :config="config" name="content_editado" disabled></trumbowyg>
          </div>
        </div>

        <div id="imagenPueblo">
          <div class="grid-preview-imagen" >
            <div class="area-upload-button" :style="{'justify-content':getUrlImagenIntro === 'none' ? 'flex-start' : ''}">
              <button id = "btnImagen" style="display: none" onClick="document.getElementById('btnexaminar').click();" class="btn btn-md" type="submit">
                <img src="@/assets/data/img/icono_subir_archivo.svg"/> 
                {{getTextoImagen}} 
              </button>
              <input style="display: none" :disabled="imgDisabled" ref="file" type="file" @change="showModal" id="btnexaminar" accept="image/*" class="oculto"/>
              <input id = "pathImagen" style="display: none;" type="text" v-model="pathImagen" disabled>
              <div class="area-referencia" :style="{display:getUrlImagenIntro==='none'?'none':''}">
                <label class="etiqueta">
                  Referencia de la imagen
                </label>
                <input type="text" v-model="content_editado" placeholder="https://www.gob.mx/inpi" @keyup="cambio_referencia">
              </div>
              
              
            </div>
            <div class="area-preview-img">
              <img :src="getUrlImagenIntro" alt="" v-if="getUrlImagenIntro!=='none'">
            </div>
          </div>
          
          
          
        </div>
        <!-- <div class="flex-between" :style="accionesDisabled"> -->
        <div class="flex-between" :style="display">
          <!-- <button v-on:click="enablePublicar" id="Guardar" class="guardar" style="pointer-events: none">Guardar</button> -->
          <button v-on:click="eliminarPueblo" id="eliminarPueblo" class="btn btn-eliminar">Eliminar</button>
          <button v-on:click="envioCambios" id="Guardar" class="btn btn-md">Publicar</button>
        </div>

    </div>

    <div id="archivos">
    <Modal v-show="isModalVisible" @close="closeModal" @aceptar="aceptarModal" />
    </div>

  </div>
</template>

<script>
import diccionarioSeccion from "../components/_diccionario_seccion.json";
import axios from "axios";
import Trumbowyg from "vue-trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.css";
// import "trumbowyg/dist/plugins/fontfamily/trumbowyg.fontfamily.min.js";
import "trumbowyg/dist/plugins/fontsize/trumbowyg.fontsize.min.js";
import Modal from '@/components/Modal.vue';
import * as FormData  from 'form-data';
import servicios from '../services/servicios.js'
import Swal from 'sweetalert2'

export default {
  created() {
    this.getPueblos();
    //console.log("created emmit",this.$attrs);

  },
  
  name: "Inicio",
  components: {
    Trumbowyg,
    Modal
  },
  data: () => ({
    publicarEnable: false,
    isModalVisible: false,
    pathImagen: '',
    content: '',
    content_editado:'',
    config: {
      removeformatPasted: true,
      btns: [
        // ["viewHTML"],
        ["undo", "redo"], // Only supported in Blink browsers
        ["formatting"],
        ["strong", "em", "del"],
        ["superscript", "subscript"],
        ["link"],
        // ['fontfamily'],
        ['fontsize'],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
        ["unorderedList", "orderedList"],
        ["horizontalRule"],
        // ["removeformat"]
      ]/* ,
      plugins: {
        fontfamily: {
            fontList: [
                {name: 'Montserrat', family : 'Montserrat'},
                {name: 'Arial', family: 'Arial, Helvetica, sans-serif'},
                {name: 'Open Sans', family: '\'Open Sans\', sans-serif'}
            ]
        }
    } */
    },
    usuario: JSON.parse(localStorage.getItem("user")),
    puebloSeleccionado: 0,
    pueblos: [],
    domain: process.env.VUE_APP_ENI_DOMAIN,
    base_route: process.env.VUE_APP_BASE_ROUTE,
    diccionarioSeccion: diccionarioSeccion,
    seccionSeleccionado: 0,
    Seccion1: "",
    //para impedir el cambio si no hay datos guardados
    ultimosCambiosGuardados:true,
    textoAlternarEdicion : "Editar",
    textoAlternarEdicion2: "Aquí puedes editar el texto.",
    referencia_text: ""
  }),

  methods: {
    getPueblos() {
      axios.get(process.env.VUE_APP_ENI_DOMAIN_REST + "/pueblos/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        }
      }).then((result) => {
        result.data.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
        this.pueblos = result.data;
        //si hay algo en seleccion, ponerlo 
        if( "seleccion" in this.$attrs){
          this.puebloSeleccionado = (this.pueblos.find(pueblo=>parseInt( this.$attrs.seleccion) === pueblo.id)) || '0'
          //console.log(this.puebloSeleccionado, "desde el router")
          
        }
        $('#imagenPueblo').css('display', 'none');
      });
    },

    eliminarPueblo() {
      Swal.fire({
        title: '¿Realmente desea eliminar el pueblo?',
        text: 'Esta operación no puede deshacerse',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#225D50',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          servicios.deletePueblo(this.puebloSeleccionado.id).then((response) => {
            this.getPueblos();
            Swal.fire({
              icon: 'success',
              title: 'Pueblo eliminado',
              showConfirmButton: false,
              timer: 1500
            });
            
            this.seccionSeleccionado = '0';
            this.puebloSeleccionado = '0';
            this.content = '';
            this.content_editado = ''
            //regresar el router a la edicion sin id
            
            if(this.$route.name!=="Editar"){
              this.$router.push({name:"Editar"})
            }
            
          });
        }
      })
    },

    agregarPueblo() {
      Swal.fire({
        title: 'Agregar pueblo',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#225D50',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (nombrePueblo) => {
          if (!nombrePueblo) {
            Swal.showValidationMessage(
              '<i class="fa fa-info-circle"></i> Debe escribir un nombre para el pueblo'
            )
          } else {
            let payload = {
                activo: true,
                nombre: nombrePueblo.toString().toUpperCase()
            };
            servicios.addPueblo(payload).then((response) => {
              this.getPueblos();
              Swal.fire({
                icon: 'success',
                title: 'Pueblo guardado',
                showConfirmButton: false,
                timer: 1500
              });
              this.puebloSeleccionado = '0';
              this.content = '';
              this.content_editado = ''
              this.seccionSeleccionado = '0';
            });
          }
        }
      });
    },

    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    aceptarModal() {
      this.isModalVisible = false;
      this.Images = this.$refs.file.files[0];
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

      var formdata = new FormData();
      formdata.append("introImage", this.$refs.file.files[0]);
        Swal.fire({
          title: 'Cargando imagen...',
          html: 'Por favor espere...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading()
          }
        });
     
      servicios.upImagen(formdata, this.puebloSeleccionado.id)
          .then((response) => {
            this.pathImagen = response.data.introImage ? response.data.introImage.split('/').pop() : null;
            $('#pathImagen').css('display', 'block');
            this.puebloSeleccionado.introImage = response.data.introImage
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Imagen guardada',
              showConfirmButton: false,
              timer: 1500
            })
          }).catch(er => {
            this.error = true;
            Swal.close();
            Swal.fire({
              title: 'Error!',
              text: 'Error al cargar la imagen',
              icon: 'error'
            })
          });
    },
    cambiarPueblo() {
      if(this.content!==this.content_editado){
        this.ultimosCambiosGuardados = false;
        return 
      }
      seccionSeleccionado: diccionarioSeccion["0"];
      this.pathImagen = null;
      $('#pathImagen').css('display', 'none');
      $('#btnImagen').css('display', 'none');
      this.publicarEnable = false;
      $("#informacion").trumbowyg("disable");
      Guardar.disabled = true;
      
      if ( parseInt(this.puebloSeleccionado) !== 0 && parseInt(this.seccionSeleccionado) !== 0 ) {
        let clave_seccion = this.seccionSeleccionado.clave
        if(this.seccionSeleccionado.clave === 'portada' ){
          clave_seccion = 'referencias'
        }
        //console.log(clave_seccion)
        this.content = this.pueblos.find((pueblo) => pueblo.id === this.puebloSeleccionado.id)[clave_seccion] ?? '';
        this.content_editado = this.content;
      }

      if (this.seccionSeleccionado.clave == 'portada') {
        $('#imagenPueblo').css('display', 'block');
        $('#contenidoPueblo').css('display', 'none');

        if (!!this.puebloSeleccionado?.introImage) {
          this.pathImagen = this.puebloSeleccionado.introImage.split('/').pop();
          $('#pathImagen').css('display', 'block');
        }
        $('#btnImagen').css('display', 'block');
      } else {
        $('#contenidoPueblo').css('display', 'block');
        $('#imagenPueblo').css('display', 'none');

        $('#pathImagen').css('display', 'none');
        $('#btnImagen').css('display', 'none');
        this.pathImagen = null;

        if (this.puebloSeleccionado === '0') {
          this.seccionSeleccionado = '0';
          this.content = '';
          this.content_editado = this.content;
          
        }
      }

    },
    cambiarSeccion() {
      if(this.content!==this.content_editado){
        this.ultimosCambiosGuardados = false;
        return 
      }
      this.publicarEnable = false;
      $("#informacion").trumbowyg("disable");
      Guardar.disabled = true;
      if (this.seccionSeleccionado.clave == 'portada') {
        $('#imagenPueblo').css('display', 'block');
        $('#contenidoPueblo').css('display', 'none');

        if (!!this.puebloSeleccionado?.introImage) {
          this.pathImagen = this.puebloSeleccionado.introImage.split('/').pop();
          $('#pathImagen').css('display', 'block');
        }
        $('#btnImagen').css('display', 'block');
      } else {
        $('#contenidoPueblo').css('display', 'block');
        $('#imagenPueblo').css('display', 'none');

        $('#pathImagen').css('display', 'none');
        $('#btnImagen').css('display', 'none');
        this.pathImagen = '';
      }
      this.content = '';
      this.content_editado = this.content;
      if ( this.puebloSeleccionado !== '0' && this.seccionSeleccionado !== '0') {
        let clave_seccion = this.seccionSeleccionado.clave
        if(this.seccionSeleccionado.clave === 'portada' ){
          clave_seccion = 'referencias'
        }
        this.content = this.pueblos.find((pueblo) => pueblo.id === this.puebloSeleccionado.id)[clave_seccion] ?? '';
        this.content_editado = this.content;
      }
    },
    alternaEdicion(){
      if(this.puebloSeleccionado==="0"  || this.seccionSeleccionado ==="0" || this.puebloSeleccionado===0  || this.seccionSeleccionado ===0){
        return false
      }

      if(Guardar.disabled){
        this.enableVistaPrevia()
        this.textoAlternarEdicion = "Cancelar edición"
        this.textoAlternarEdicion2 = ""
      }else{
        this.content_editado = this.content;
        Guardar.disabled =true
        this.textoAlternarEdicion = "Editar"
        this.textoAlternarEdicion2 = "Aquí puedes editar el texto."
        $("#informacion").trumbowyg("disable");
        
      }
    },
    enableVistaPrevia() {
      Guardar.disabled = false;
      Guardar.style = "pointer-events: auto";
      $("#informacion").trumbowyg("enable");
    },
    enableGuardar() {
      Guardar.disabled = false;
      Guardar.style = "pointer-events: auto";
    },
    enablePublicar() {
      Publicar.disabled = false;
      this.publicarEnable = true;
      Publicar.style = "pointer-events: auto";
    },
    cambio_referencia(){
      if(Guardar.disabled){
        this.enableGuardar()
      }
    },
    envioCambios() {
      this.content = this.content_editado
      let patch = {[this.seccionSeleccionado.clave]: this.content};
      
      if(this.seccionSeleccionado.clave === 'portada'){
        patch = {["referencias"]: this.content}
        
        
      }
      axios.patch(process.env.VUE_APP_ENI_DOMAIN_REST + "/pueblos/" + this.puebloSeleccionado.id + "/", patch, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        }
      })
      .then((result) => {
        if (result.status === 200) {
          Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Se ha guardado el texto capturado correctamente.',
              showConfirmButton: false,
              timer: 1500
            });
            
            this.content = this.seccionSeleccionado.clave === 'portada' ?  result.data["referencias"] : result.data[this.seccionSeleccionado.clave];
            //this.content_editado = this.content
            let clave_seleccionada = this.seccionSeleccionado.clave === 'portada' ? 'referencias': this.seccionSeleccionado.clave 
            this.puebloSeleccionado[clave_seleccionada] = this.content
        }
      })
      .catch((er) => {
        this.error = true;
        console.log("error", er);
      });
    }
  },
  computed: {

    accionesDisabled () {
      return this.puebloSeleccionado == '0' || this.pueblos?.length <= 1 ? 
        'display: none' : 
        'display: flex';
    },

    getTextoImagen () {
      return !!this.pathImagen ? 'Cambiar imagen': 'Subir imagen';
    },
    getUrlImagenIntro(){
      return this.puebloSeleccionado === '0' ? "none" : this.puebloSeleccionado.introImage === "" ? "none" : this.puebloSeleccionado.introImage
    },
    seccionDisabled() {
      return this.puebloSeleccionado === 0;
    },
    editarDisabled() {
      return this.puebloSeleccionado == '0' || this.seccionSeleccionado == '0';
    },
    publicarDisabled() {
      return this.puebloSeleccionado == '0' || this.seccionSeleccionado == '0';
    },
    imgDisabled() {
      return ( this.puebloSeleccionado === 0 );
    },
    obtenerNombreEni() {
      return this.$store.getters.obtenerNombreEni;
    }
  },
  watch: {
    puebloSeleccionado (new_v, old_valu){
      if(!this.ultimosCambiosGuardados){
         Swal.fire({
          title: 'Tienes cambios sin publicar',
          text:"Si cambias de pueblo perderas los cambios que no se han publicado",
          showDenyButton: true,
          confirmButtonText: 'Regresar',
          confirmButtonColor: '#225D50',
          denyButtonText: 'Continuar',
          showLoaderOnConfirm: true,
          allowOutsideClick:false,
          allowEscapeKey:false,
          preConfirm: () => {
            //console.log("llegamos aqui")
            this.ultimosCambiosGuardados =true
            this.puebloSeleccionado = old_valu
          },
          preDeny: ()=>{
            
            this.ultimosCambiosGuardados =true
            this.content_editado = this.content
            this.cambiarPueblo()
          }
        })
      }
    },
    seccionSeleccionado (new_v, old_valu){
      if(!this.ultimosCambiosGuardados){
         Swal.fire({
          title: 'Tienes cambios sin publicar',
          text:"Si cambias de sección perderas los cambios que no se han publicado",
          showDenyButton: true,
          confirmButtonText: 'Regresar',
          confirmButtonColor: '#225D50',
          denyButtonText: 'Continuar',
          showLoaderOnConfirm: true,
          allowOutsideClick:false,
          allowEscapeKey:false,
          preConfirm: () => {
            //console.log("llegamos aqui")
            this.ultimosCambiosGuardados =true
            this.seccionSeleccionado = old_valu
          },
          preDeny: ()=>{
            
            this.ultimosCambiosGuardados =true
            this.content_editado = this.content
            this.cambiarSeccion()
          }
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/// new
.flex-between {
  display: flex;
  justify-content: space-between;
}
.fila {
  display: flex;
  gap: $gap;
  .columna {
    flex: 1 0 calc(50% - #{$gap});
  }
}
.etiqueta {
  display: block;
  font-weight: 600;
  margin: $gap*.5 0 $gap*.25;
}
.selector {
  display: block;
  width: 100%;
}
//// new


.notas{
  margin-top: 10px;
  font-size: 10px;
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
}

.row-imagen {
  align-content: right;
}

.session {
  margin: 0 auto;
  top: 138px;
  left: 288px;
  width: 800px;
}
.bold {
  font-weight: bold;
}
.cuadro {
  font-size: 14px;
  font-family: "Montserrat";
  font-style: normal;
  padding: 10px;
  background-color: #eeeeee;
}
.titulo-editar {
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: left;
  font-size: 24;
  font: normal normal 600 24px/29px Montserrat;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
.text-seccion {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: bold;
  margin: 0 auto;
  margin-top: 40px;
  font-size: 16;
  width: 100%;
}
.botonos {
  margin-top: 40px;
  width: 100%;
}
.text-input {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: bold;
  margin: 0 auto;
  font-size: 16;
  width: 100%;
}

.guardar {
  background: #ffffff 0% 0% no-repeat padding-box;
  width: 100px;
  font-family: "Montserrat";
  border: 1px solid #f7f7f7;
  color: #000000;
  font-size: 14px;
  border-radius: 5px;
  opacity: 1;
  padding-top: 5px;
  padding-bottom: 5px;
}
.disable-editar {
  background: #00000029 0% 0% no-repeat padding-box;
  width: 80px;
  font-family: "Montserrat";
  border: 1px solid #f7f7f7;
  font-size: 14px;
  border-radius: 5px;
  opacity: 1;
  padding-top: 5px;
  padding-bottom: 5px;
}
.enable-publicar {
  background: #000000 0% 0% no-repeat padding-box;
  width: 80px;
  font-family: "Montserrat";
  border: 1px solid #f7f7f7;
  font-size: 14px;
  border-radius: 5px;
  opacity: 1;
  padding-top: 5px;
  padding-bottom: 5px;
}
.disable-publicar {
  background: #00000029 0% 0% no-repeat padding-box;
  width: 80px;
  font-family: "Montserrat";
  border: 1px solid #f7f7f7;
  font-size: 14px;
  border-radius: 5px;
  opacity: 1;
  padding-top: 5px;
  padding-bottom: 5px;
}

.boton {
  background: #000000 0% 0% no-repeat padding-box;
  width: 80px;
  font-family: "Montserrat";
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  opacity: 1;
  padding-top: 10px;
  padding-bottom: 10px;
}
.box {
  display: flex;
  justify-content: flex-end;
  // flex-wrap: wrap;
  margin: $gap*.5 0;
}

.flex-column {
  flex: 1;
}

.img_carga_arch {
  margin-left: 10px;
  margin-right: 0px !important;
  margin-bottom: 15px;
  width: 29%;
  height: 31px;
  border-radius: 10px;
  opacity: 1;
}

.oculto {
  display: none;
}
.archivos {
  margin: 80 auto;
  margin-bottom: 60px;
  width: 465px;
  height: 243px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.5px solid #000000;
  border-radius: 10px;
  opacity: 1;
  padding: 10px 10px;
}
button#Guardar{
   &:disabled{
     background-color: #707070;
   }
}

.grid-preview-imagen{
  display: flex;
  align-items: center;
  width: 100%;

  .area-preview-img{
    flex-basis: 30%;
    img{
      width: 100%;
    }
  }
  .area-upload-button{
    flex-basis: 70%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    margin-right: 10px;
    #pathImagen{
      flex-grow: 1;
      flex-basis: 60%;
    }
    .area-referencia{
      flex-grow: 1;
      input{
        width: 100%;
      }
    }
  }
}
</style>

<style>
  .trumbowyg-box {
    border-radius: 6px;
    border: 1px solid #aaa;
  }

  .trumbowyg-button-pane {
    border-top-left-radius: 6px !important;
    border-top-right-radius: 6px !important;
    z-index: 0 !important;
  }

.margin-bottom {
  margin-bottom: 10px;
}

.margin-left {
  margin-left: 10px !important;
}

.swal2-input{
    text-transform:uppercase;
 }

 .width-100 {
   width: 100%;
 }
 .width-810 {
   width: 810px;
 }

button#btnImagen{
  margin-bottom: 15px;
}


</style>
