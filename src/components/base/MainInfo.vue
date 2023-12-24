<template>
  <MainContainer v-if="entornoProyecto !== 'production'">
    <dl class="info-entorno">
      <dt>V</dt>
      <dd>{{versionProyecto}}</dd>
      <dt>Ambiente: </dt>
      <dd>{{entornoProyecto}}</dd>
      <dt>Actualización: </dt>
      <dd>{{actualizacionProyecto}}</dd>
    </dl>
  </MainContainer>
</template>

<script>
import MainContainer from '@/components/base/MainContainer.vue';

export default {
  name: 'MainInfo',
  components: {
    MainContainer,
  },
  computed: {
    versionProyecto() {
      return this.$store.getters.versionProyecto;
    },
    actualizacionProyecto() {
      return this.$store.getters.actualizacionProyecto;
    },
    entornoProyecto() {
      return this.$store.getters.entornoProyecto;
    },
  },
};
</script>

<style scoped lang="scss">
.info-entorno {
  position: fixed;
  left: 0;
  right: 0;
  bottom: $gap * -1;
  z-index: 9999;
  background: rgba(0,0,0,.5);
  pointer-events: none;
  user-select: none;
  dt, dd {
    color: #fff;
    font-size: 10px;
    line-height: 12px;
    padding: 0;
    margin: 0;
    text-align: left;
    display: inline-block;
  }
  dt {
    padding-left: 4px;
  }
  dd {
    padding-left: 4px;
    &:not(:last-child) {
      padding-right: 8px;
    }
  }
}
</style>
