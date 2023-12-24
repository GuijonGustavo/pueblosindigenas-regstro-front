<template>
  <a class="link-cover-img"
    :class=size
    :href=url
    :target=target
    :rel="target?'noopener noreferrer':false">
    <img v-if="size!='full'" class="card-cover" :src=cover alt="">
    <picture class="card-cover-picture" v-if="size=='full'" >
      <source :srcset="cover_escritorio ? cover_escritorio : cover" media="(min-width: 769px)">
      <img class=card-cover :srcset="cover_movil ? cover_movil : cover" alt="">
    </picture>
    <span class="card-button">
      <span class="card-title">
        {{ title }}
      </span>
      <span class="btn-ir">
        <span class="icono-descargar"></span>
      </span>
    </span>
  </a>
</template>

<script>
export default {
  name: 'LinkCoverImgButton',
  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    cover_movil: {
      type: String,
    },
    cover_escritorio: {
      type: String,
    },
    size: {
      type: String,
    },
    target: {
      type: String,
    },
    degradado_activo: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
$altura_card: 240px;
.link-cover-img {
  border-radius: 0;
  background-color: transparent;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  height: auto;
  position: relative;
  padding: 0;
  &:not(:last-child){
    margin-bottom: $gap*.5;
  }
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    &:not(:last-child){
      margin-bottom: 0;
    }
  }
  &:focus {
    .card-cover {
      border-color: #e8e8e8;
      border-width: 5px;
      opacity: .8;
    }
  }
  .card-cover-picture {
    width: 100%;
  }
  .card-cover {
    height: $altura_card;
    box-sizing: border-box;
    border: 0 solid #505050;
    object-fit: cover;
    object-position: 50% 50%;
    opacity: 1;
    width: 100%;
  }
  .card-button {
    margin-bottom: 0;
    display: flex;
    position: relative;
    top: -5px;
    background: #000;
    font-size: 22px;
    font-weight: 700;
    padding: 6.5px 13px;
    border-radius: 5px;
    max-width: 100%;
    width: max-content;
    transform: translateY(-50%);
    span.card-title{
      color: #fff;
      flex: 1;
    }
    span.btn-ir{
      background: #F0F0F0;
      border-radius: 50%;
      width: 30px;
      min-width:30px;
      height: 30px;
      margin-left: 20px;
      display:inline-block;
      position: relative;
      transition: margin-left .27s ease-in-out;
      span.icono-descargar{
        color: #000;
        font-size: 32px;
        transform: rotate(-90deg);
        display: block;
        position:absolute;
        left: 6px;
        top: -6px;
      }
    }
  }

  &:hover,
    &:focus {
      span.btn-ir{
        margin-left: 50px;
      }
    }
}
.half {
  max-width: calc(50% - #{$gap*.25});
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    max-width: calc(50% - 5px);
  }
}
.half-desk {
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    max-width: calc(50% - 5px);
  }
}
</style>
