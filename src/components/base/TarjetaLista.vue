<template>
  <div class="tarjeta">
    <div v-if="portada" class="tarjeta-portada">
      <img :src=portada alt="">
    </div>
    <div class="tarjeta-contenido">
      <p class="tarjeta-titulo">{{ titulo }}</p>
      <p class="tarjeta-cantidad">{{ elementos.length }} descargas</p>
      <ul class="tarjeta-lista">
        <li v-for="el in elementos" :key="el.id">
          <TarjetaListaLink :nombre="el.nombre" :url=el.url />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TarjetaListaLink from '@/components/base/TarjetaListaLink.vue';

export default {
  name: 'TarjetaLista',
  components: {
    TarjetaListaLink,
  },
  props: {
    titulo: {
      type: String,
      required: true
    },
    portada: {
      type: String
    },
    elementos: {
      type: Array,
      required: true
    }
  },
};
</script>

<style scoped lang="scss">
$tarjeta-alto: 140px;
$tarjeta-titulo-alto: 30px;
$tarjeta-cantidad-alto: 20px;
$tarjeta-lista-alto: 90px;
$espacio: $gap*.5;

$tarjeta-alto_md: 240px;
$tarjeta-titulo-alto_md: 40px;
$tarjeta-cantidad-alto_md: 30px;
$tarjeta-lista-alto_md: 170px;
$espacio_md: $gap;

.tarjeta {
  display: flex;
  height: $tarjeta-alto;
  margin-bottom: $gap;
  
  .tarjeta-portada {
    padding-right: $espacio*1;
    img {
      border-radius: $espacio*.5;
      width: $tarjeta-alto*.9;
      height: $tarjeta-alto;
      object-fit: cover;
    }
  }

  .tarjeta-contenido {
    flex: 1 0;
    border-bottom: 2px solid rgba(0,0,0,1);
  }

  .tarjeta-titulo {
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    font-size: map-get($fuente, "size-alto");
    font-weight: 600;
    line-height: 1.3em;
    padding: $espacio*.25 $espacio*.5;
    margin: 0;
    height: $tarjeta-titulo-alto;
    overflow: hidden;
  }

  .tarjeta-cantidad {
    font-size: map-get($fuente, "size-notas");
    padding: $espacio*.25 $espacio*.5;
    margin: 0;
    height: $tarjeta-cantidad-alto;
    overflow: hidden;
  }

  .tarjeta-lista {
    list-style: none;
    margin: 0;
    padding: 0 0 0 $espacio*.5;
    overflow: auto;
    height: $tarjeta-lista-alto;
    li {
      font-size: map-get($fuente, "size-secundario");
      border-bottom: 1px solid rgba(0,0,0,.1);
      padding: $espacio*.25 0;
      margin: 0;
      a {
        display: inline;
      }
      &::before {
        display: none;
      }
    }
  }
}
@media (min-width: map-get($media-queries-limit, "mobile")) {
  .tarjeta {
    height: $tarjeta-alto_md;
    
    .tarjeta-portada {
      padding-right: $espacio_md*1;
      img {
        border-radius: $espacio_md*.5;
        width: $tarjeta-alto_md;
        height: $tarjeta-alto_md;
      }
    }

    .tarjeta-titulo {
      padding: $espacio_md*.25 $espacio_md*.5;
      height: $tarjeta-titulo-alto_md;
    }

    .tarjeta-cantidad {
      padding: $espacio_md*.25 $espacio_md*.5;
      height: $tarjeta-cantidad-alto_md;
    }

    .tarjeta-lista {
      padding: 0 0 0 $espacio_md*.5;
      height: $tarjeta-lista-alto_md;
      li {
        font-size: map-get($fuente, "size-primario");
        padding: $espacio_md*.25 0;
      }
    }
  }
}
</style>
