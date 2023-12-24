<template>
  <div class="dai-leer-mas-menos">
    <div class="texto-corto"><slot name="texto-corto" /></div>
    <div class="texto-largo" v-bind:class="{'abierto': abierto}">
      <slot name="texto-largo" />
    </div>
    <button class="btn-leer-mas-menos"
      @click="abierto=!abierto">
      {{abierto? "Leer menos": "Leer más"}}
    </button>
  </div>
</template>

<script>
export default {
  data() { return {
    abierto: false,
  }},
}
</script>

<style scoped lang="scss">
.dai-leer-mas-menos {
  .texto-corto {
    * {
      margin-bottom: 0;
    }
  }
  .texto-largo {
    max-height: 0;
    overflow: hidden;
    transition: all .33s ease-in-out;
    &.abierto {
      max-height: 370px;
    }
  }
  .btn-leer-mas-menos {
    margin-top: 16px;
  }
}
</style>
