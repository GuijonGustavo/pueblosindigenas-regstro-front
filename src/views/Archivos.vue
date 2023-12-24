<template>
  <div>
    <div class="container m-y-2">
      <h1 class="titulo">Actualizar Mapa</h1>
      <div class="archivos">
        <div class="subtitulo">Carga tu archivo para actualizar el mapa</div>
        <p>Sube tu archivo a la plataforma</p>
        <br>
        <div>
          <input ref="file" type="file" @change="showModal" id="btnexaminar" accept=".csv" class="oculto" size="35" />
          <button onClick="document.getElementById('btnexaminar').click();" class="btn btn-lg btn-block" type="submit">
            <img class="icono-carga" src="@/assets/data/img/icono_subir_archivo.svg"/> 
            Cargar archivo
          </button>
        </div>        
      </div>
      <div v-if="tienearchivo">
        <h2 class="titulo m-t-4">Mi archivo actual</h2>
        <table class="tabla-archivo">
          <thead>
            <tr>
              <th>Nombre del archivo</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="archivo in archivos" :key="archivo.id">
              <td>Capa comunidades indígenas. {{archivo.nombre}}</td>
              <td>{{archivo.modificadoEn | formatDate}}</td>
              <td>
                <!-- <a class="link-descarga" :href="urlArchivo"><img src="@/assets/data/img/icono_bajar_archivo.svg">Descargar</a> -->
                <a
                  :href="`${urlApi}/media/files/cedulaIndigena.csv`"
                  class="link-descarga"
                  download="cedulaIndigena.csv"
                >
                  <img src="@/assets/data/img/icono_bajar_archivo.svg">
                  Descarga
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Carga un archivo para actualizar la capa de comunidades indígenas en el mapa principal de pueblos.</p>
    </div>
    <Modal v-show="isModalVisible" @close="closeModal" @aceptar="aceptarModal" /> 
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import * as FormData  from 'form-data'
import servicios from '../services/servicios.js';
import Swal from 'sweetalert2'
export default {
  name: 'Archivos',
  created() {
    // this.descargar();
    this.getArchivos();
  },
  components: {
    Modal,
  },
 data: () => ({
    isModalVisible: false,
    nombre: null,
    fecha: null,
    urlApi: process.env.VUE_APP_ENI_DOMAIN_REST,
    archivos: [],
    tienearchivo: false,
  }),
  filters: {
    formatDate: function (fecha) {
      let date = new Date(fecha);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return d + '-' + MM + '-' + y + ' ' + h + ':' + m + ':' + s;
    }
  },
  methods: {
    getArchivos(){
        servicios.getArchivos().then((response) => {
          this.archivos = response.data;
          if (this.archivos.length > 0) {
            this.tienearchivo = true
          } else {
            this.tienearchivo = false
          } 
        }).catch(er => {
        this.error = true;
      });
    },
    // descargar() {
    //   servicios.getArchivo().then((response) => {
    //     this.urlArchivo = response.data
    //   }).catch(er => {
    //     this.error = true;
    //   });
    // },
    showModal() {
      this.isModalVisible = true;
    },
    aceptarModal() {
      this.isModalVisible = false;
      const formData = new FormData();

      Swal.fire({
        title: 'Cargando archivo...',
        html: 'Por favor espere...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      
      const myRenamedFile = new File([this.$refs.file.files[0]], "cedulaIndigena.csv");

      formData.append('archivoSubida', myRenamedFile);
        servicios.upArchivos( formData ).then((response) => { 
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Archivo guardado',
            showConfirmButton: false,
            timer: 1500
          })
          this.getArchivos();
        }).catch(er => {
        this.error = true;
        Swal.close();
        Swal.fire({
          title: 'Error!',
          text: 'El archivo no corresponde con la plantilla determinada',
          icon: 'error'
        })
      });
      document.getElementById('btnexaminar').value = '';
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
}

</script>

<style lang="scss">
.oculto {
  display: none;
}

.archivos {
  display: block;
  margin: $gap 0;
  width: 100%;
  max-width: 465px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: $gap;
}

.tabla-archivo {
  width: 100%;
  th {
    display: none;
  }
  td {
    display: block;
    border-bottom: none;
    padding: 0;
    b::before {
      content: '\A';
      white-space: pre;
    }
  }
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    th {
      background: #F3F3F3;
      border-bottom: none;
      display: table-cell;
      padding: $gap*.5;
    }
    td {
      display: table-cell;
      padding: $gap*.5;
      border-bottom: 1px solid #ccc;
      b::before {
        content: ' ';
        white-space: inherit;
      }
    }
  }
}
.link-descarga {
  background: #ccc;
  color: #000;
  padding: $gap*.5 $gap;
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    background: transparent;
    font-weight: bold;
    padding: 0;
    &:hover,
    &:focus {
      background: transparent;
      color: #777;
    }
  }
}
</style>
