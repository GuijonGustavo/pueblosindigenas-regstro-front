<template>
  <a class="link-externo" :class="parent" :href=url target="_blank" rel="noopener">
    <slot />
    <span class="a11y-solo-lectura"> (Link externo).</span>
  </a>
</template>

<script>
export default {
  name: 'LinkExterno',
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
