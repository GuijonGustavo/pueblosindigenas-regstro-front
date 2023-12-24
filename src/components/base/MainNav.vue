<template>
  <nav class="main-nav">
    <MainContainer class="flex">
      <div class="main-nav-top">
        <a href="https://conacyt.mx/" class="logo-cel-conacyt">
          <img
          src="@/assets/img/base/conacyt-azul.svg"
          alt="Conacyt."
          height="36px">
        </a>
        <BtnNavMob v-if="usuario"
          @click.native="toggleMenu"
          :class="{'open':isOpenMainNav, 'color-conacyt':true}" 
          aria-expanded="false"
          aria-controls="navegacion-principal"/>
      </div>
      <div class="main-nav-current" v-if="usuario">
        Sección:
        <b>{{currentRouteName}}</b>
      </div>

      <div
        aria-label="Navegación principal"
        id="navegacion-principal"
        class="main-nav-menu"
        :class="{'open':isOpenMainNav}"
        @click="toggleMenu">

        <div class="main-nav-menu-seccion">
          <a href="https://conacyt.mx/" class="logo-conacyt">
            <img
            src="@/assets/img/base/conacyt-azul.svg"
            alt="Conacyt."
            height="36px">
          </a>
        </div>

        <div class="main-nav-menu-seccion" v-if="usuario">
          <div class="main-nav-submenu">
            <span class="main-nav-link"><img class="icon" src="@/assets/data/img/persona.svg">Editar información de pueblos</span>
            <div class="submenu">
              <button class="main-nav-link" @click="agregarPueblo">Agregar nuevo pueblo</button>
              <button class="main-nav-link" @click="getPueblos">Editar pueblo existente</button>    
              
            </div>
          </div>
          <!--router-link class="main-nav-link" to="/editar"><img class="icon" src="@/assets/data/img/familia.svg">Editar información de pueblos</router-link-->
          <router-link class="main-nav-link" to="/archivos"><img class="icon" src="@/assets/data/img/mexico.svg">Actualizar mapa</router-link>
          <div class="main-nav-submenu">
            <span class="main-nav-link"><img class="icon" src="@/assets/data/img/persona.svg">{{usuario.email}}</span>
            <div class="submenu">
              <button class="main-nav-link" v-on:click="logout">x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Salir</button>
            </div>
          </div>
        </div>
     </div>
    </MainContainer>
  </nav>
</template>

<script>
import MainContainer from '@/components/base/MainContainer.vue';
import BtnNavMob from '@/components/base/BtnNavMob.vue';
import servicios from '../../services/servicios.js'
import Swal from 'sweetalert2'
import axios from "axios";

export default {
  name: 'MainNav',
  components: {
    MainContainer,
    BtnNavMob,
  },
  data() {
    return {
      domain: process.env.VUE_APP_ENI_DOMAIN,
      usuario: JSON.parse(sessionStorage.getItem("user")),
      pueblos: []
    };
  },
  methods: {
    toggleMenu() {
      this.$store.commit('toggleMainNav');
    },
    logout(){
      document.cookie = "cookiePrueba=; max-age=0; path=/";
      document.cookie = "sessionid=; max-age=0; path=/";
      //location.reload()
      servicios.logout().then((response) => {
        // console.log(response);
        sessionStorage.clear();
      })
      this.usuario = null;
      this.$router.push('/')
    },
    editar(){
      window.location.href = process.env.VUE_APP_ENI_DOMAIN+process.env.VUE_APP_BASE_ROUTE+"/editar";
    },
    archivos(){
      window.location.href = process.env.VUE_APP_ENI_DOMAIN+process.env.VUE_APP_BASE_ROUTE+"/archivos";
    },
    //metodo global porque se manda a llamar desde el
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
              console.log(response)
              //this.getPueblos();
              Swal.fire({
                icon: 'success',
                title: 'Pueblo guardado',
                showConfirmButton: false,
                timer: 1500
              });
              console.log(nombrePueblo)
              console.log("se agrego el pueblo, redirigir con la pantalla de edicion al mismo")
              this.$router.push({name:"Editar-seleccion",params:{seleccion:response.data.id}})
              //this.puebloSeleccionado = '0';
              //this.content = '';
              //this.seccionSeleccionado = '0';
            });
          }
        }
      });
    },
    getPueblos() {
      
      axios.get(process.env.VUE_APP_ENI_DOMAIN_REST + "/pueblos/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        }
      }).then((result) => {
        result.data.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
        this.pueblos = result.data;
        let todas_opciones = this.pueblos.map(pueblo=>`<option value="${pueblo.id}">${pueblo.nombre}</option>`).join("")
        Swal.fire({
          title:"Editar pueblo existente",
          html:`<select id="modal-select-pueblo"><option value="0">Selecciona un pueblo para editar</option>${todas_opciones}</select>`,
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#225D50',
          cancelButtonText: 'Cancelar',
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            let puebloSeleccionadoEnModal = Swal.getPopup().querySelector("select#modal-select-pueblo").value
            //console.log(puebloSeleccionadoEnModal)
            if(puebloSeleccionadoEnModal!=="0"){
              this.$router.push({name:"Editar-seleccion",params:{seleccion:puebloSeleccionadoEnModal}})
            }else{
              //mostrar un mensaje de que seleccione uno
              Swal.showValidationMessage(
                '<i class="fa fa-info-circle"></i> Debe seleccionar un pueblo'
              )
            }
          }
        })
      });
    },
  },
  computed: {
    hasMainNav() {
      return this.$store.getters.hasMainNav;
    },
    isOpenMainNav() {
      return this.$store.getters.isOpenMainNav;
    },
    obtenerNombreEni() {
      return this.$store.getters.obtenerNombreEni;
    },
    currentRouteName() {
      return this.$route.name;
    }
  },
};
</script>

<style scoped lang="scss">
.icon { 
  vertical-align:text-bottom; 
  margin-right: 5px;
  line-height: 16px;
  width: 16px;
}

.logo-cel-conacyt {
  padding: $gap*.25;
}
.logo-conacyt {
  display: none;
}
.main-nav {
  background: map-get($color-nav, "fondo");
  box-shadow: 0 0 5px rgba(0,0,0,.5);
}
.main-nav-top {
  background: map-get($color-nav, "fondo");
  box-shadow: 0 0 40px rgba(0,0,0,.2);
  position: relative;
  margin-right: $gap * -1;
  margin-left: $gap * -1;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main-nav-current {
  background: map-get($color-nav, "fondo");
  font-size: map-get($fuente, "size-secundario");
  color: map-get($color-nav, "texto");
  padding: $gap*.25 0;
  text-align: center;
}
.main-nav-menu {
  background: map-get($color-nav, "fondo");
  border-top: 1px solid map-get($color-nav, "borde");
  overflow-y: auto;
  position: absolute;
  top: -100vh;
  height: calc((100 * var(--vh)) - 50px);
  width: calc(100%);
  margin-right: $gap * -1;
  margin-left: $gap * -1;
  transition: top .3s ease-in-out;
  z-index: 2;
  &.open {
    top: 50px;
  }
}
.submenu {
  .main-nav-external-link,
  .main-nav-link {
    padding-left: $gap * 1.5;
  }
  button.main-nav-link {
    background: map-get($color-nav, "fondo");
    color: map-get($color-nav, "texto");
    width: 100%;
    text-align: left;
    &:hover,
    &:focus {
      background: map-get($color-nav, "fondo-hover-cel");
      color: map-get($color-nav, "texto-hover-cel");
    }
  }
}
.main-nav-external-link {
  font-size: map-get($fuente, "size-notas");
  color: map-get($color-nav, "texto");
  text-transform: uppercase;
  display: block;
  padding: $gap*.5;
  font-weight: bold;
}
.main-nav-link {
  font-size: map-get($fuente, "size-secundario");
  color: map-get($color-nav, "texto");
  display: block;
  border-radius: 0;
  display: block;
  padding: $gap*.5;
  line-height: 20px;
}
.main-nav-link {
  &.router-link-active,
  &:active,
  &:focus,
  &:hover {
    background: map-get($color-nav, "fondo-hover-cel");
    color: map-get($color-nav, "texto-hover-cel");
  }
}
@media (min-width: map-get($media-queries-limit, "navegacion")) {
  .logo-conacyt {
    display: inline-block;
    padding: $gap*.25 $gap 0;
    margin-left: $gap * -1;
    &:focus,
    &:active {
      background: transparent;
      color: map-get($color-nav, "texto-hover");
    }
    &:hover {
      background: map-get($color-nav, "fondo-hover");
      color: map-get($color-nav, "texto-hover");
    }
  }
  .main-nav-menu {
    border-top: none;
    position: relative;
    overflow: inherit;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: inherit;
    top: 0;
    width: calc(100% + $gap*.5);
    margin-left: 0;
    margin-right: 0;
    &.open {
      top: 0;
    }
    .main-nav-menu-seccion {
      display: flex;
    }
  }
  .main-nav-external-link{
    display: inline-block;
    white-space: nowrap;
    &:focus,
    &:active {
      background: transparent;
      color: map-get($color-nav, "texto-hover");
    }
    &:hover {
      background: map-get($color-nav, "fondo-hover");
      color: map-get($color-nav, "texto-hover");
    }
  }

  .main-nav-link {
    display: inline-block;
    white-space: nowrap;
    &.router-link-active,
    &:active,
    &:focus,
    &:hover {
      background: map-get($color-nav, "fondo-hover");
      color: map-get($color-nav, "texto-hover");
    }
  }
  .main-nav-top,
  .main-nav-current {
    display: none;
  }
  .main-nav-submenu {
    position: relative;
    .submenu {
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,.5);
      overflow: hidden;
      margin: -5px 0 0;
      opacity: 0;
      position: absolute;
      pointer-events: none;
      transition: all .27s ease-in-out;
      .main-nav-external-link,
      .main-nav-link {
        background: map-get($color-nav, "fondo");
        color: map-get($color-nav, "texto");
        padding: $gap*.5;
        display: block;
        white-space: inherit;
        .nowrap,
        &.nowrap {
          white-space: nowrap;
        }
        &:active,
        &:focus,
        &:hover {
          background: map-get($color-nav, "fondo-hover");
          color: map-get($color-nav, "texto-hover");
        }
      }
       button.main-nav-link {
        background: map-get($color-nav, "fondo");
        color: map-get($color-nav, "texto");
        width: 100%;
        text-align: left;
        &:active,
        &:focus,
        &:hover {
          background: map-get($color-nav, "fondo-hover");
          color: map-get($color-nav, "texto-hover");
        }
      }
    }
    &:hover,
    &:focus,
    &:focus-within,
    &:active {
      .submenu {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}
</style>
