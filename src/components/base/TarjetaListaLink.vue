<template>
  <a :href="url" class="tarjeta" target="_blank" rel="noopener">
    {{ nombre }}
  </a>
</template>

<script>
export default {
  name: 'TarjetaListaLink',
  props: {
    nombre: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
  },
};
</script>

<style scoped lang="scss">
</style>
