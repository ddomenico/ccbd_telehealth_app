<template>
  <v-container
    grid-list-md
    text-xs-center
    class="auth-form"
  >
    <v-layout
      row
      wrap
      justify-center
      class="auth-form"
    >
      <v-flex xs6>
        <div class="display-1 primary--text font-weight-thin mb-5">Page Not Found</div>
        <div class="title font-weight-thin">
          🙉🌴 Are you lost? Don't worry... Take me
          <span
            class="active-link title font-weight-thin primary--text"
            @click="goHome"
          >Home!</span>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Lost',
  methods: {
    goHome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>