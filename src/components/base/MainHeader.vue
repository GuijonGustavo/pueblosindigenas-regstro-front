<template>
  <header class="header-mx">
    <MainContainer class="flex">
      <nav class="nav-gob-top flex">
        <link-gob url="https://www.gob.mx/" class="logo-gob">
          <img
          src="@/assets/img/base/gobmx.svg"
          alt="Gobierno de México."
          width="124px"
          height="36px">
        </link-gob>
        <BtnNavMob
          aria-expanded="false"
          aria-controls="navegacion-gobierno"
          @click.native="toggleMenu"
          :class="{'open':isOpenGobNav, 'no-text':true, 'color-gob':true}" />
      </nav>
      <nav
        id="navegacion-gobierno"
        aria-label="Navegación del Gobierno de México"
        class="nav-gob"
        :class="{'open':isOpenGobNav}">
        <link-gob url="https://mivacuna.salud.gob.mx/index.php" parent="ph-mx">Registro para vacunación</link-gob>
        <link-gob url="https://coronavirus.gob.mx/" parent="ph-mx">Información sobre COVID-19</link-gob>
        <link-gob url="https://www.gob.mx/tramites/" parent="ph-mx">Trámites</link-gob>
        <link-gob url="https://www.gob.mx/" parent="ph-mx">Gobierno</link-gob>
        <link-gob url="https://www.gob.mx/busqueda?utf8=%E2%9C%93" parent="ph-mx">Búsqueda</link-gob>
      </nav>
    </MainContainer>
  </header>
</template>

<script>
import MainContainer from '@/components/base/MainContainer.vue';
import LinkGob from '@/components/base/LinkGob.vue';
import BtnNavMob from '@/components/base/BtnNavMob.vue';

export default {
  name: 'MainHeader',
  components: {
    MainContainer,
    LinkGob,
    BtnNavMob,
  },
  computed: {
    isOpenGobNav() {
      return this.$store.getters.isOpenGobNav;
    },
  },
  methods: {
    toggleMenu() {
      if (this.$store.getters.isOpenGobNav) {
        this.$store.commit('closeGobNav');
      } else {
        if (this.$store.getters.isOpenMainNav) {
          this.$store.commit('closeMainNav');
        }
        this.$store.commit('openGobNav');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header-mx {
  background: map-get($color-gob, "verde-obscuro");
  position: relative;
  z-index: 9999;
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-gob-top {
    background: map-get($color-gob, "verde-obscuro");
    margin-right: $gap * -1;
    margin-left: $gap * -1;
    flex: 1;
    position: relative;
    z-index: 2;
  }
  .logo-gob {
    padding: $gap*.25;
  }
  .nav-gob {
    background: map-get($color-gob, "verde-obscuro");
    border-top: 1px solid map-get($color-gob, "dorado");
    box-shadow: 0 0 10px rgba(0,0,0,.7);
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    left: 0;
    top: -160px;
    padding-top: $gap*.25;
    padding-bottom: $gap*.25;
    z-index: 1;
    transition: top .3s ease-in-out;
    .link-gob {
      padding: $gap*.25 $gap*.5;
    }
    &.open {
      top: 51px;
    }
  }
  @media (min-width: map-get($media-queries-limit, "navegacion")) {
    .flex {
      flex-direction: row;
    }
    .nav-gob-top {
      margin-right: 0;
    }
    .logo-gob {
      padding: $gap*.25 $gap;
    }
    .nav-gob {
      box-shadow: none;
      border: none;
      flex-direction: row;
      position: relative;
      top: 0;
      .link-gob {
        padding: $gap*.25 0;
        margin-left: $gap*.5;
      }
    }
  }
}
</style>
