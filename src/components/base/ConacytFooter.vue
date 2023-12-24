<template>
  <footer class="footer-conacyt">
    <MainContainer class="footer-flex">
      <div class="flex">
        <img
          src="@/assets/img/base/conacyt.svg"
          alt="Gobierno de México"
          width="200px"
          height="60px">
        <p>Consejo Nacional de Ciencia y Tecnología</p>

        <p>
          Av. Insurgentes Sur 1582, Col. Crédito Constructor,<br>
          Alcaldía Benito Juárez, C.P. 03940, Ciudad de México<br>
          Tel: (55) 5322-7700
        </p>

        <p>©2021 Conacyt Derechos Reservados</p>
      </div>
      <nav class="flex">
        <p class="footer-titulo">
          Enlaces<span class="a11y-solo-lectura">.</span>
        </p>
        <link-externo url="https://conacyt.mx/conacyt/directorio/" class="link-conacyt">
          Directorio
        </link-externo>
        <link-externo url="https://conacyt.mx/soporte-tecnico/" class="link-conacyt">
          Soporte Técnico
        </link-externo>
        <link-externo url="https://conacyt.mx/aviso-de-privacidad/" class="link-conacyt">
          Política de Privacidad
        </link-externo>
        <link-externo url="http://comunidad.conacyt.mx/" class="link-conacyt">
          Intranet Conacyt
        </link-externo>
      </nav>
      <nav class="flex">
        <p class="footer-titulo">
          Síguenos en <span class="a11y-solo-lectura">nuestras redes sociales:</span>
        </p>
        <p>
          <link-social url="https://www.facebook.com/ConacytMX/" icono="social-facebook" spanglish="feisbuk, " />
          <link-social url="https://twitter.com/Conacyt_MX" icono="social-twitter" spanglish="tuiter, " />
          <link-social url="https://www.instagram.com/conacyt_mx/" icono="social-instagram" spanglish="instagram " />
          <link-social url="https://www.youtube.com/channel/UClcVyko0ESwMc_6Lu1bXmIQ" icono="social-youtube" spanglish=" y youtube." />
        </p>
      </nav>
    </MainContainer>
  </footer>
</template>

<script>
import MainContainer from '@/components/base/MainContainer.vue';
import LinkExterno from '@/components/base/LinkExterno.vue';
import LinkSocial from '@/components/base/LinkSocial.vue';

export default {
  name: 'MainFooter',
  components: {
    MainContainer,
    LinkExterno,
    LinkSocial,
  },
};
</script>

<style scoped lang="scss">
.footer-conacyt {
  background: map-get($color-conacyt, "fondo");
  box-sizing: border-box;
  overflow: hidden;
  margin-top: $gap*2;
  padding-top: $gap;
  padding-bottom: $gap * .5;
  color: map-get($color-conacyt, "texto");
  font-size: 14px;
  .footer-titulo {
    margin-top: $gap;
    font-weight: 600;
  }
  .footer-link-margen {
    margin-top: $gap;
    margin-bottom: $gap * .5;
  }
  .footer-descripcion {
    margin-bottom: $gap * .5;
  }
  .link-conacyt {
    background: transparent;
    font-size: map-get($fuente, "size-notas");
    color: map-get($color-conacyt, "link");
    display: block;
    &:hover,
    &:focus {
      background: transparent;
      color: map-get($color-conacyt, "link-hover");
    }
  }
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    padding-top: $gap * .25;
    padding-bottom: $gap;
    .footer-flex {
      display: flex;
      gap: $gap;
      .flex {
        flex: 1;
        &:first-child {
          flex: 2;
          padding-top: $gap*.8;
          margin-right: $gap;
        }
      }
    }
  }
}
</style>
