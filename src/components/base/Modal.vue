<template>
  <transition name="fade">
    <div class="modal" v-if="esta_abierto">
      <div class="modal-fondo-trasero" @click="cerrarModal()"/>
      <div class="modal-contenedor">
        <div class="modal-encabezado">
          <slot name="encabezado"/>
          <button v-if="posicion_boton == 'arriba'"
            class="btn-icono icono-cerrar modal-cerrar"
           @click="cerrarModal()">
          </button>
        </div>

        <div class="modal-cuerpo">
          <slot name="cuerpo"/>
        </div>

        <div class="modal-pie">
          <slot name="pie"/>
          <button class="modal-cerrar"
            v-if="posicion_boton == 'abajo'"
            @click="cerrarModal()">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      esta_abierto: false,
    };
  },
  props: {
    posicion_boton: {
      type: String,
      default: 'arriba',
    },
  },
  methods: {
    cerrarModal() {
      this.esta_abierto = false;
      document.querySelector('body').classList.remove('overflow-hidden');
    },
    abrirModal() {
      this.esta_abierto = true;
      document.querySelector('body').classList.add('overflow-hidden');
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  &-fondo-trasero {
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &-contenedor {
    background-color: #f0f0f0;
    position: relative;
    width: map-get($width, "max-text");
    margin: 120px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: map-get($media-queries-limit, "mobile")) {
      width: 90%;
    }
  }
  button.modal-cerrar{
    background: none;
    box-shadow: none;
    color:#000;
    font-weight: 700;
    margin-left: auto;
    &:hover{
      color:#000
    }
  }
  &-encabezado {
    padding: 0 20px 0 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &-cuerpo {
    padding: 0 20px 0 20px;
    //display: flex;
    //flex-direction: column;
    //align-items: stretch;
  }
  &-pie {
    padding: 0 20px 10px 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
