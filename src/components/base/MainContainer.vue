<template>
  <div class="main-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MainContainer',
};
</script>

<style scoped lang="scss">
.main-container {
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - #{ $gap * 2 });
  max-width: map-get($width, "max-main");
}
</style>
