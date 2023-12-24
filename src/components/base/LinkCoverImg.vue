<template>
  <a class="link-cover-img"
    :class=size
    :href=url
    :target=target
    :rel="target?'noopener noreferrer':false">
    <picture class="card-cover-picture">
      <source :srcset="cover_escritorio ? cover_escritorio : cover" media="(min-width: 769px)">
      <img class=card-cover :srcset="cover_movil ? cover_movil : cover" alt="">
    </picture>
    <h3 class="card-title link" :class="{'degradado-activo':degradado_activo}">
      <span class="a11y-contraste-fondo">{{title}}</span>
    </h3>
  </a>
</template>

<script>
export default {
  name: 'LinkCoverImg',
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
  background-color: #505050;
  box-sizing: border-box;
  border-radius: 5px;
  height: $altura_card;
  flex: 1 0 100%;
  overflow: hidden;
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
  &:hover {
    .card-cover {
      border-width: 5px;
      opacity: .9;
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
    border-radius: 5px;
    object-fit: cover;
    object-position: 50% 50%;
    opacity: 1;
    width: 100%;
    transition:
      border-color .27s ease-in-out,
      border-width .27s ease-in-out,
      opacity .3s ease-in-out;
  }
  .card-title {
    box-sizing: content-box;
    font-size: map-get($fuente, "size-subtitulo");
    font-weight: 600;
    line-height: 1.2em;
    color: transparent;
    display: flex;
    align-items: flex-end;
    padding: $gap*.35 $gap*.5;
    margin: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
    background: rgba(0,0,0,0);
    &.degradado-activo {
      background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.9));
      color: #fff;
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
