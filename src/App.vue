<template>
  <div id="app">
    <MainHeader class="header" :class="{'show':showNav}" />
    <MainNav class="navigation" :class="{'show':showNav}" />
    <router-view class="view" />
    <ConacytFooter />
    <MainInfo />
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from '@/components/base/MainHeader.vue';
import MainNav from '@/components/base/MainNav.vue';
import MainInfo from '@/components/base/MainInfo.vue';
import ConacytFooter from '@/components/base/ConacytFooter.vue';
import MainFooter from '@/components/base/MainFooter.vue';

export default {
  name: 'App',
  components: {
    MainHeader,
    MainNav,
    MainInfo,
    ConacytFooter,
    MainFooter,
  },
  data() {
    return {
      showNav: false,
    };
  },
  
  methods: {
    onScroll() {
      if (this.$store.getters.isOpenGobNav) {
        this.$store.commit('closeGobNav');
      }
      if (this.$store.getters.isOpenMainNav) {
        this.$store.commit('closeMainNav');
      }
    },
    calHeight() {
      const innerheight = window.innerHeight / 100;
      document.querySelector(':root').style.setProperty('--vh', `${innerheight.toString()}px`);
    },
  },
  created() {
    this.calHeight();
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.calHeight);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.calHeight);
  },
};
</script>

<style lang="scss">
@import '@/scss/app.scss';

// .tituloglosario{
//   font-size: 30px;
//   font-weight: bold;
// }
// .veintiuno{
//   font-size: 21px;
//   font-weight: bold;
// }
// .texto{
//   font-family: "Montserrat";
//   font-size: 16px;
// }
// .textocreditos{
//   font-family: "Montserrat";
//   font-size: 16px;
//     display: flex;
// }
// .imgcreditos{
//   width: 300px;
// }
// .textoinicio{
//   font-family: "Montserrat";
//   padding: 40px;
//   text-align: justify;
// }
// .texcreditos{
//   width: 600px;
//   text-align: left;
//   vertical-align: middle;
// }
// .centrardiv{
//   width: 100%;
//   margin: 0 auto;
//   text-align:center
// }

// .navigation {
//   position: sticky;
//   top: 0;
//   z-index: 9998;
// }

// .overflow-hidden {
//   overflow: hidden;
// }
</style>
