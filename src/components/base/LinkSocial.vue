<template>
  <a class="link-social" :class=icono :href=url target="_blank" rel="noopener">
    <span class="a11y-solo-lectura">{{ spanglish }}</span>
  </a>
</template>

<script>
export default {
  name: 'LinkSocial',
  props: {
    icono: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    spanglish: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.link-social {
  font-size: map-get($fuente, "size-subtitulo");
  color: #fff;
  padding: 0;
  margin-left: - 5px;
  margin-right: $gap*.5;
  &:hover,
  &:focus {
    background: transparent;
    color: map-get($color-gob, "dorado");
  }
}
</style>
