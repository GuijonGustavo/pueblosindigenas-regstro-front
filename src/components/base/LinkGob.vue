<template>
  <a class="link-gob" :class="parent" :href=url target="_blank" rel="noopener">
    <slot />
    <span class="a11y-solo-lectura"> (Link externo).</span>
  </a>
</template>

<script>
export default {
  name: 'LinkGob',
  props: {
    url: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.link-gob {
  background: transparent;
  color: map-get($color-gob, "beige");
  font-size: map-get($fuente, "size-notas");
  &:hover {
    background: transparent;
    color: map-get($color-gob, "dorado");
  }
  &:focus {
    background: map-get($color-gob, "dorado");
    color: map-get($color-gob, "verde-obscuro");
  }
  &.pn-mx {
    padding: $gap*.5;
  }
  &.ph-mx {
    display: inline-flex;
  }
  &.pf-mx {
    display: block;
  }
}
</style>
