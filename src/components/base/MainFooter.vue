<template>
  <footer class="footer-mx">
    <MainContainer class="footer-flex">
      <div class="flex">
        <img
          src="@/assets/img/base/gobmx.svg"
          alt="Gobierno de México"
          width="200px"
          height="60px">
      </div>
      <nav class="flex">
        <p class="footer-titulo">
          Enlaces<span class="a11y-solo-lectura">.</span>
        </p>
        <link-gob url="https://participa.gob.mx/" parent="pf-mx">
          Participa
        </link-gob>
        <link-gob url="https://www.gob.mx/publicaciones" parent="pf-mx">
          Publicaciones Oficiales
        </link-gob>
        <link-gob url="http://www.ordenjuridico.gob.mx/" parent="pf-mx">
          Marco Jurídico
        </link-gob>
        <link-gob url="https://consultapublicamx.inai.org.mx/vut-web/faces/view/consultaPublica.xhtml" parent="pf-mx">
          Plataforma Nacional de Transparencia
        </link-gob>
      </nav>
      <nav class="flex">
        <p class="footer-titulo">¿Qué es gob.mx?</p>
        <p class="footer-descripcion">
          <small>Es el portal único de trámites, información y participación ciudadana.</small>
          <link-gob url="https://www.gob.mx/que-es-gobmx" parent="pf-mx">Leer más</link-gob>
        </p>
        <link-gob url="https://datos.gob.mx/" parent="pf-mx">
          Portal de datos abiertos
        </link-gob>
        <link-gob url="https://www.gob.mx/accesibilidad" parent="pf-mx">
          Declaración de accesibilidad
        </link-gob>
        <link-gob url="https://datos.gob.mx/privacidadintegral" parent="pf-mx">
          Aviso de privacidad integral
        </link-gob>
        <link-gob url="https://datos.gob.mx/privacidadsimplificado" parent="pf-mx">A
          viso de privacidad simplificado
        </link-gob>
        <link-gob url="https://datos.gob.mx/terminos" parent="pf-mx">
          Términos y Condiciones
        </link-gob>
        <link-gob url="https://datos.gob.mx/terminos#medidas-seguridad-informacion" parent="pf-mx">
          Política de seguridad
        </link-gob>
        <link-gob url="https://datos.gob.mx/sitemap" parent="pf-mx">
          Mapa de sitio
        </link-gob>
      </nav>
      <nav class="flex">
        <link-gob class="footer-link-margen" url="https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54" parent="pf-mx">
          Denuncia contra servidores públicos
        </link-gob>
        <p class="footer-titulo">
          Síguenos en <span class="a11y-solo-lectura">nuestras redes sociales:</span>
        </p>
        <p>
          <link-social url="https://www.facebook.com/gobmx" icono="social-facebook" spanglish="feisbuk " />
          <link-social url="https://twitter.com/gobmx" icono="social-twitter" spanglish=" y tuiter." />
        </p>
      </nav>
    </MainContainer>
  </footer>
</template>

<script>
import MainContainer from '@/components/base/MainContainer.vue';
import LinkGob from '@/components/base/LinkGob.vue';
import LinkSocial from '@/components/base/LinkSocial.vue';

export default {
  name: 'MainFooter',
  components: {
    MainContainer,
    LinkGob,
    LinkSocial,
  },
};
</script>

<style scoped lang="scss">
.footer-mx {
  background: map-get($color-gob, "verde");
  background-image: url('../../assets/img/base/gobmxpleca.svg');
  background-position: bottom;
  background-repeat: repeat-x;
  background-size: auto 50px;
  box-sizing: border-box;
  overflow: hidden;
  padding-top: $gap;
  padding-bottom: $gap * 1.5;
  color: #fff;
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
  @media (min-width: map-get($media-queries-limit, "mobile")) {
    padding-top: $gap * .25;
    padding-bottom: $gap * 2.5;
    .footer-flex {
      display: flex;
      gap: $gap;
      .flex {
        flex: 1;
        &:first-child {
          padding-top: $gap*.8;
        }
      }
    }
  }
}
</style>
