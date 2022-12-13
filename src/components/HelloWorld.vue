<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Please login or create an account to continue.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  color:white;
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  color: white;
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
