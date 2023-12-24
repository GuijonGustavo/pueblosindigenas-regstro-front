<template>
  <div>
    <router-view class="view" :key="$route.path" />
  </div>
</template>

<script>
export default {
  name: "Administracion",
};
</script>

<style lang="scss">
.alternativas-container {
  display: flex;
  flex-direction: column;
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    flex-direction: row;
    min-height: calc(100vh - 100px);
  }
  .publi{
    height: 800px;
  } 
  .menu-lateral {
    position: fixed;
    background-color: #e4f1eb;
    width: 100%;
    max-height: 800px;
    a.selected {
      display: block;
      &:hover {
        background: none;
      }  
      .flex-container {
        display: flex;
        justify-content: space-between;
        position: relative;
        .tema {
          margin-bottom: 8px;
          display: block;
        }
        .subtema {
          font-weight:normal;
        }
        span.icono-despliegue {
          width: 24%;
          img.arrow-icon {
            position: absolute;
            right: 0;
            width: 32px;
            transition: all .3s ease-in-out;
            &.rotar {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
    .dropdown {
      overflow: hidden;
      max-height: 0px;
      transition: all 0.3s ease-in-out;
    
      &.esta-abierto {
        max-height: 700px;
      }
    }
    @media (min-width: map-get($media-queries-limit, "mobile")) {
      min-height: calc(100vh - 100px);
      max-width: 300px;
      margin: 0;
      padding: 16px;
      display: block;
      a.selected {
        display: none;
      }
      .dropdown,
      .dropdown.esta-abierto {
        max-height: inherit;
      }
    }
    .menu-lateral-item.title {
      font-weight: 600;
      padding: 8px 16px;
    }
    a.menu-lateral-item {
      color: black;
      padding: 8px 32px;
      width: 100%;
      &:hover {
        background: #D7E5DD;
      }
      &.active {
        background: rgba(33, 108, 66, 0.5);
        box-shadow: 0 0 0 4px rgba(33, 108, 66, 0.5);
        outline: none;
      }
    }
    .separador {
      width: 100%;
      height: 0px;
      border: 0.5px solid #468161;
      opacity: 0.2;
      margin: 9px 0;
    }
  }
  .container {
    max-width: inherit;
  }
}
.tam {
  margin-top: 60px;
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    margin-top: 0;
    margin-left: 300px;
  }
}
</style>
