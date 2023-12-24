<template>
  <div class="a11y-container" :class="{'show':hasA11yMenu}">
    <button
      aria-labelledby="a11y-titulo"
      data-target="menu-accesibilidad"
      class="a11y-toggle"
      :class="{'abierto':isOpenA11yMenu}"
      @click="toggleA11yMenu">
      <img alt="" src="@/assets/img/base/a11y-icono.png">
    </button>
    <div
      id="menu-accesibilidad"
      :class="{'a11y-menu':true, 'abierto':isOpenA11yMenu}"
      @click="toggleA11yMenu">
      <p id="a11y-titulo" class="a11y-title">Herramientas de accesibilidad</p>
      <button
        :class="{'a11y-opcion':true, 'prendido':tieneAltoContraste}"
        type="button"
        @click="alternarAltoContraste">
        <span class="icono">
          <img v-if="tieneAltoContraste" src="@/assets/img/base/a11y-contraste.svg" alt="">
          <img v-else src="@/assets/img/base/a11y-contraste.png" alt="">
        </span>
        <span class="nombre">Alto contraste</span>
      </button>
      <!-- <button class="a11y-opcion" type="button">
        <span class="icono"><img src="@/assets/img/base/a11y-texto.png" alt=""></span>
        <span class="nombre">Crecer texto</span>
      </button> -->
      <!-- <button class="a11y-opcion" type="button">
        <span class="icono"><img src="@/assets/img/base/a11y-texturas.png" alt=""></span>
        <span class="nombre">Texturas en visualizaciones</span>
      </button> -->
      <button
        class="a11y-opcion"
        :class="{'prendido':tieneVistaSimplificada}"
        type="button"
        @click="alternarVistaSimplificada">
        <span class="icono">
          <img v-if="tieneVistaSimplificada" src="@/assets/img/base/a11y-simplificada.svg" alt="">
          <img v-else src="@/assets/img/base/a11y-simplificada.png" alt="">
        </span>
        <span class="nombre">Vista simplificada</span>
      </button>
      <button
        class="a11y-opcion"
        :class="{'prendido':tieneEnlacesSubrayados}"
        type="button"
        @click="alternarEnlacesSubrayados">
        <span class="icono">
          <img v-if="tieneEnlacesSubrayados" src="@/assets/img/base/a11y-enlaces.svg" alt="">
          <img v-else src="@/assets/img/base/a11y-enlaces.png" alt="">
        </span>
        <span class="nombre">Enlaces subrayados</span>
      </button>
      <button class="a11y-opcion" type="button" @click="restablecerEstilo">
        <span class="icono"><img src="@/assets/img/base/a11y-restablecer.png" alt=""></span>
        <span class="nombre">Restablecer</span>
      </button>
      <router-link class="a11y-opcion" to="/ayuda">
        <span class="icono"><img src="@/assets/img/base/a11y-ayuda.png" alt=""></span>
        <span class="nombre">Ayuda</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'A11yMenu',
  computed: {
    hasA11yMenu() {
      return this.$store.getters.hasA11yMenu;
    },
    isOpenA11yMenu() {
      return this.$store.getters.isOpenA11yMenu;
    },
    tieneAltoContraste() {
      return this.$store.getters.tieneAltoContraste;
    },
    tieneVistaSimplificada() {
      return this.$store.getters.tieneVistaSimplificada;
    },
    tieneEnlacesSubrayados() {
      return this.$store.getters.tieneEnlacesSubrayados;
    },
  },
  methods: {
    toggleA11yMenu() {
      this.$store.commit('toggleA11yMenu');
    },
    alternarAltoContraste() {
      this.$store.commit('alternarAltoContraste');
    },
    alternarVistaSimplificada() {
      this.$store.commit('alternarVistaSimplificada');
    },
    alternarEnlacesSubrayados() {
      this.$store.commit('alternarEnlacesSubrayados');
    },
    restablecerEstilo() {
      this.$store.commit('quitarAltoContraste');
      this.$store.commit('quitarVistaSimplificada');
      this.$store.commit('quitarEnlacesSubrayados');
    },
  },
};
</script>

<style scoped lang="scss">
.a11y-container {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: none;
  &.show {
    display: block;
  }
}
.a11y-toggle {
  background: transparent;
  border-radius: 50px;
  display: block;
  height: 50px;
  width: 50px;
  margin: $gap*.5;
  padding: 0;
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    margin: $gap;
  }
  &.abierto {
    margin: -25px;
    @media (min-width: map-get($media-queries-limit, "mobile")) {
      margin: -25px;
    }
  }
  &:hover,
  &:focus {
    box-shadow: 0 0 0 5px rgba(19,113,233,.5);
  }
}
.a11y-menu {
  background: #eee;
  overflow: hidden;
  max-height: 0;
  width: 0;
  transition: width .27s ease-in, max-height .2s ease-in .1s;
  &.abierto {
    width: 290px;
    max-height: 500px;
  }
  .a11y-title {
    font-size: map-get($fuente, "size-alto");
    border-bottom: 1px solid #141414;
    padding: 5px 0;
    width: 210px;
    margin: 0 40px 10px;
    text-align: left;
  }
  .a11y-opcion {
    font-size: map-get($fuente, "size-primario");
    background: transparent;
    border-radius: 0;
    color: map-get($color-boton, "fondo");
    align-items: center;
    padding: 10px 40px 5px;
    margin: 0;
    text-align: left;
    .icono {
      display: block;
      width: 70px;
      transition: all .3s ease-in-out;
    }
    .nombre {
      display: block;
      width: 140px;
    }
    &.prendido {
      background: map-get($color-boton, "hover-fondo");
      .nombre {
        color: map-get($color-boton, "hover-texto");
      }
    }
    &:hover,
    &:focus {
      background: rgba(0,0,0,.2);
      .icono {
        filter: drop-shadow(0 2px 2px rgba(0,0,0,.5));
      }
      .nombre {
        color: map-get($color-boton, "fondo");
        text-shadow: 0 1px 1px #fff;
      }
    }
  }
}
</style>
