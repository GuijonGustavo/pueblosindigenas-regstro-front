<template>
  <button class="btn-nav-mob" type="button">
    <span class="a11y-solo-lectura">Menú</span>
    <span class="btn-icon"></span>
    <span class="btn-text"></span>
  </button>
</template>

<script>
export default {
  name: 'BtnNavMob',
};
</script>

<style scoped lang="scss">
.btn-nav-mob {
  background: transparent;
  border-radius: 0;
  display: flex;
  margin: 0;
  position: relative;
  height: 50px;
  width: 50px;
  .btn-text {
    font-size: map-get($fuente, "size-boton");
    position: relative;
    bottom: -12px;
     &::after {
       content: 'Menú'
     }
  }
  .btn-icon {
    width: 20px;
    height: 1px;
    display: block;
    
    transition: all .3s ease-in-out;
    position: absolute;
    top: 18px;
    &::after,
    &::before {
      content: "";
      width: 20px;
      height: 1px;
      display: block;
      position: absolute;
      transition: all .3s ease-in-out;
    }
    &::after {
      top: 5px;
    }
    &::before {
      top: -5px;
    }
  }
  &.color-gob {
    .btn-text {
      color: map-get($color-nav, "texto-gob");
    }
    .btn-icon {
      background: map-get($color-nav, "texto-gob");
      &::after,
      &::before {
        background: map-get($color-nav, "texto-gob");
      }
    }
  }
  &.color-conacyt{
    .btn-text {
      color: map-get($color-nav, "texto-conacyt");
    }
    .btn-icon {
      background: map-get($color-nav, "texto-conacyt");
      &::after,
      &::before {
        background: map-get($color-nav, "texto-conacyt");
      }
    }
  }
  &.no-text {
    .btn-text {
      display: none;
    }
    .btn-icon {
      top: 25px;
    }
  }
  &.open {
    .btn-icon {
      width: 0;
      &::after {
        transform: translate3d(-10px,-5px,0) rotate(-135deg);
      }
      &::before {
        transform: translate3d(-10px,5px,0) rotate(135deg);
      }
    }
    .btn-text {
      &::after {
        content: 'Cerrar'
      }
    }
  }
  &:hover {
    background: transparent;
  }
  &.color-gob:focus {
    background: map-get($color-gob, "dorado");
  }
  &.color-conacyt:focus {
    background: map-get($color-conacyt, "azul");
    .btn-icon {
      background: map-get($color-conacyt, "texto");
      &::after,
      &::before {
        background: map-get($color-conacyt, "texto");
      }
    }
    .btn-text {
      color: map-get($color-conacyt, "texto");
    }
  }
  @media (min-width: map-get($media-queries-limit, "navegacion")) {
    display: none;
  }
}
</style>
