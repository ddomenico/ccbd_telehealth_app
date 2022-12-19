<template>

    <div id="chatbot">
        <ChatComponent :completed="completed"/>
    </div>

</template>


<script>

import ChatComponent from './ChatComponent.vue'


export default {
  components: { ChatComponent },
  name: "App",
  data: () => ({
    
  }),
  mounted() {

  },
  methods: {


  },
};




</script>



<style>
#chatbot {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding-top: 15%;
}

</style>