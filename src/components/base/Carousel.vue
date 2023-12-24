<template>
  <div class="carrusel-cuerpo" :id='id' >
    <VueSlickCarousel v-bind="settings" ref="c1"
      :asNavFor="c2"
      :focusOnSelect="true">
      <div v-for="(slide,i) in lista" :key="i">
        <img class="carrusel-foto" :src="slide[0]" :style="{height:altura_imagenes}"/>
      </div>
    </VueSlickCarousel>
    <VueSlickCarousel :arrows="false" ref="c2"
      :asNavFor="c1"
      :focusOnSelect="true">
      <div v-for="(slide,i) in lista" :key="i">
        <p class="carrusel-pie">{{slide[1]}}</p>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: 'Carousel',
  components: { VueSlickCarousel },
  props: {
    lista: {
      type: Array,
    },
    altura_imagenes: {
      type: String,
      default: '360px',
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      settings: {
        arrows: true,
        dots: false,
      },
      c1: undefined,
      c2: undefined,
      altura_botones: `${(parseInt(this.altura_imagenes, 10) / 2)}px`,
    };
  },
  mounted() {
    console.log(this.$refs.c2);
    this.c1 = this.$refs.c1;
    this.c2 = this.$refs.c2;
  },
};
</script>
<style lang='scss'>
.carrusel-cuerpo {
  padding: 0 10px;
  p.carrusel-pie{
    font-size: 12px;
    font-weight: 600;
    margin-top:5px;
  }
  img.carrusel-foto{
    border-radius: 5px;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  .slick-prev {
    transform: rotate(135deg);
    left: -16px;
  }
  .slick-next {
    transform: rotate(-45deg);
    right: -16px;
  }
  .slick-prev, .slick-next {
    width: 15px;
    height: 15px;
    border-radius: 0;
    border-bottom: solid 2px #4B4B4B;
    border-right: solid 2px #4B4B4B;
    &:before {
      content: "";
    }
  }
}

</style>
