<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
</script>

<template>
    <div class="float-container">
        <div class="float-child">
            <img alt="TH logo" class="logo" src="../assets/telehealth.png" height="125" />

            <div class="wrapper">
                <HelloWorld msg="Welcome to the Telehealth app" />
            </div>
        </div>
        <div class="float-child">
            <authenticator>
                <template v-slot="{ user, signOut }">
                    <h1>Hello {{ user.username }} !</h1>
                    <button @click="signOut">Sign Out</button>
                </template>
            </authenticator>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
  }
}

</script>

<style>
.float-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 10%;
    /* left: 0; */
    place-items: center;
    justify-content: center;
}
.float-child {
    position:sticky;
    justify-content: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  input {
    margin-right: 10px;
  }
}
</style>