<script setup lang="ts">
import { IonPage } from "@ionic/vue";
import { reactive } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
// TODO: Add validation
const loginForm = reactive({ username: '', password: '' });

async function onSubmit() {
  // TODO: To be replaced with real logic
  if (loginForm.username === '12' && loginForm.password === '12') {
    await router.push('/success');
    loginForm.username = '';
    loginForm.password = '';
  }
}
</script>

<template>
  <IonPage>
    <div class="container">
      <div class="login-header">
        <div class="translate-box" >
          <div class="translate">
            <img class="icon" src="../assets/images/translate.svg" alt="translate">
          </div>
        </div>
        <img class="logo" src="../assets/images/logo.svg">
        <p class="version">ALFA</p>
      </div>
      <div class="login-footer">
        <div class="terms">
          <div class="green"></div>
          <p class="text">TERMINOS Y CONDICIONES</p>
        </div>
        <form @submit.prevent="onSubmit()" class="form-field">
          <input
              v-model="loginForm.username"
              class="input"
              placeholder="Ingresa tu email"
              maxlength="50"
              minlength="1"
              required
          >
          <input
              v-model="loginForm.password"
              class="input"
              placeholder="Ingresa tu contraseña"
              maxlength="50"
              minlength="1"
              required
          >
        </form>
        <div class="login" @click="onSubmit()">
          <img class="button-image" src="https://biz-app-bucket.s3.us-east-2.amazonaws.com/iiz.png">
        </div>
      </div>
    </div>

  </IonPage>
</template>

<style scoped lang="scss">
@import '@/core/sass/global';

.container {
  height: 100%;
  background-image: url('https://biz-app-bucket.s3.us-east-2.amazonaws.com/login_prado.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  justify-content: space-between;
  @include flex-column;

  .login-header,
  .login-footer {
    margin-bottom: 4rem;
    width: 100%;
    @include flex-column;
  }
}

.translate-box {
  height: 7rem;
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.translate {
  width: 4rem;
  border-radius: 0.4rem;
  background-color: $green;

  .icon {
    margin-left: 0.5rem;
    margin-top: 0.8rem;
  }
}

.logo {
  width: 15rem;
  margin: 1rem;
}

.icon {
  padding: 0.2rem;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
}

.login {
  height: 3rem;
  min-width: 30rem;
  width: 85%;
  background-color: $green;
  border-radius: 0.4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.button-image {
  height: 2rem;
  margin-right: 1rem;
  filter: brightness(0%);
}

.terms {
  width: 85%;
  min-width: 30rem;
  background-color: $white;
  border-radius: 0.3rem;
  font-weight: bold;
  text-align: end;
  display: flex;
  padding: 0.25rem;

  .text {
    width: 90%;
    height: 1rem;
    font-size: 1rem;
    margin-right: 0.3rem;
    margin-top: 0.5rem;
    color: $black;
  }

  .green {
    width: 8%;
    height: 18%;
    padding: 1rem;
    border-radius: 0.3rem;
    background-color: $green;
  }
}

.version {
  padding: 0.5rem 2.4rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.4rem;
  background-color: $yellow;
  color: black;
}

.form-field {
  width: 85%;
  min-width: 30rem;
  margin-top: 0.4rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;

  .input {
    height: 3.5rem;
    margin: 0.2rem 0;
    text-align: center;
    background-color: white;
    font-size: 1.25rem;
    outline: none;
    color: black;
    border: none;
  }
}

.form-field .input::placeholder {
  text-align: center;
  line-height: 5rem;
  opacity: 50%;
}

</style>