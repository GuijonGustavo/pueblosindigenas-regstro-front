<template>
  <div class="container">
    <div class="session">
      <div class="titulo">Inicia sesión</div>
      
      <label for="email">Correo electrónico</label>
      <input v-model="email" type="email" id="email" required placeholder="correo_electronico@empresa.com">

      <label for="password">Contraseña</label>
      <input v-model="password" type="password" id="password" placeholder="********" required>
      
      <button v-on:click="login" type="submit"> Ingresa </button>

      <p v-if="error" class="error">Has introducido mal el correo electrónico y/o la contraseña.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Inicio',
  state: {
    token: null
  },
  mutations: {
    setToken(state, payload){
      state.token = payload
    }
  },
  data: () => (
    {
      email: '',
      password: '',
      error: false,
  }),
   methods: {
    login() {
      axios.post(process.env.VUE_APP_ENI_DOMAIN_REST+"/user/login/",{
        email: this.email,
        password: this.password
      })
      .then(result => {
        sessionStorage.setItem('user',JSON.stringify(result.data.user))
        sessionStorage.setItem('jwt', result.data.access_token)
        if (sessionStorage.getItem('jwt') != null) {
          this.$emit('loggedIn')
          this.$router.push(`/editar`)
          document.cookie = "cookiePrueba=valorPrueba; max-age=3600; path=/";
          setTimeout(function(){
            window.location.reload();
          },1000)
        }
      })
      .catch(er => {
        this.error = true;
        console.log("error", er);
      });
    },
    getToken({commit}) {
      if(sessionStorage.getItem('token')) {
        commit('setToken', sessionStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    },
    created(){
      this.getToken()
    }
  },
};
</script>

<style lang="scss" scoped>
.session {
  margin: 0 auto;
  width: 95%;
  max-width: 410px;
  background: #FFF;
  border: 1px solid #000;
  border-radius: 10px;
  margin-bottom: 64px;
  margin-top: 64px;
  padding: 32px;
  
  label {
    display: block;
    margin-top: 32px;
    font-weight: 600;
    font-size: 14px;
  }
  input {
    font-size: 14px;
    display: block;
    width: 100%;
    margin-top: 4px;
    border-radius: 4px;
    border: 1px solid #666;
    background: #fff;
    height: 40px;
  }
  button {
    margin-top: 64px;
    display: block;
    padding: 8px;
    width: 100%;
    border-radius: 4px;
    height: 50px;
  }
  .error {
    color: #a51b1b;
  }
}
</style>
