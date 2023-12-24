<template>
  <div class="container">
    <h1 class="main-title">{{title}}<span class="a11y-solo-lectura">.</span></h1>
    <p class="main-description">{{description}}<span class="a11y-solo-lectura" v-if="description">.</span></p>
  </div>
</template>

<script>
export default {
  name: 'MainTitle',
  props: {
    title: String,
    description: String
  }
}
</script>

<style scoped lang="scss">
.main-title {
  // border-bottom: 1px solid #000;
  color: #000;
  font-size: 1.9em;
  font-weight: 500;
  padding: 20 0 20;
  line-height: 1.1em;
}
.main-description {
  margin: 20 0 20 0;
  font-size: 1.2em;
  @media (min-width: 100) {
    max-width: 64%;
  }
}

</style>
