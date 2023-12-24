<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Publicar archivo
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
         ¿Realmente desea publicar el archivo? 
         <br>
          Esta operación no  puede deshacerse
        </slot>
       </section>

      <footer class="modal-footer">
        <slot name="footer">
          
        </slot>
        <div class="btn-group">
        <button type="button" class="btn-cancelar" @click="close" >Cancelar</button>
        <button type="button" class="btn-aceptar" @click="aceptar">Aceptar</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
      aceptar() {
        this.$emit('aceptar');
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    border: 3px solid #1256C4;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #1256C4;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #000000;
    background: transparent;
  }

  .btn-cancelar {
    padding-right: 10px;
    width: 40%;
    color: rgb(0, 0, 0);
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 10px;
    float: left;
  }
  .btn-aceptar {
    width: 40%;
    color: white;
    background: #000000;
    border: 1px solid #000000;
    border-radius: 10px;
   float: right;
  }
</style>