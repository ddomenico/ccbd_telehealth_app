<template>
    <div class="hello">
      <div class="messages clearfix">
      <div v-show="messages === []"> Please enter your message </div>
  
        <div v-for="(msg, _) in messages" :key="_">
          <div :class="{
            'message': true, 
            'sender': msg.sender === 'user', 
            'bot': msg.sender !== 'user' 
            }">
            
            <!-- <div v-if="msg.msg.slots">
              <span><strong> FlowerType: </strong> {{msg.msg.slots.FlowerType}}</span><br />
              <span><strong> PickupDate: </strong> {{msg.msg.slots.PickupDate}}</span><br />
              <span><strong> PickupTime: </strong> {{msg.msg.slots.PickupTime}}</span><br />
            </div>
            <div v-else> <strong style="padding-right: 10px">{{date}}:</strong> {{msg.msg}} </div> -->
            <div> <strong style="padding-right: 10px">{{date}}:</strong> {{msg.msg}} </div>
          </div>
        </div>
        
      </div>
  
      <div class="input-container">
        <input type="text" @keypress.enter="sendMessage" v-model="message" />
        <button @click="sendMessage"> Send </button>
      </div>
      <div class="loading" v-show="loading"> loading... </div>
    </div>
  </template>
  
<script>

import { Amplify, API } from 'aws-amplify';
import Auth from '@aws-amplify/auth'

Amplify.configure({
    API: {
        endpoints: [
            {
                name: "patientProfileChatbot",
                endpoint: "https://xl87xov42d.execute-api.us-east-1.amazonaws.com/test-stage"
            }
        ]
    }
});


export default {
    name: 'HelloWorld',
    mounted() {
            Auth.currentUserInfo()
                .then(res => {
                    this.patientID = res.username;
                    console.log(this.patientID);
                })
                .catch(err => {
                console.error(err);
                })
        },
    computed: {
        date(){
        const d = new Date()
        return `${d.getHours()}: ${d.getMinutes()}: ${d.getSeconds()}`
        }
    },
    data(){
        return {
            completed: null,
            message: null,
            messages: [],
            loading: false,
            patientID: '',
        }
    },
    methods: {
               
        
        async sendMessage() {
            
            // Read user's input message
            this.loading = true
            const msg = this.message
            if (!this.message) return
            this.message = ''
            this.messages.push({sender: 'user', msg })
            console.log(msg)
            // if ($.trim(msg) == '') {
            // return false;
            // }

            const userInput = {
                body: {
                    "messages": [
                        {
                        "unstructured": {
                            "text": msg
                        }
                        }
                    ],
                    "patientID": this.patientID   
                }

            }

            const apiName = 'patientProfileChatbot'
            const path = '/patient/' + this.patientID + '/chatbot'

            // Retrieve response
            await API.post(apiName, path, userInput)
                    .then((response) => {
                        
                        console.log(response);
                        var data = response;

                        if (data.messages && data.messages.length > 0) {
                        console.log('received ' + data.messages.length + ' messages');

                        var messages = data.messages;

                        for (var message of messages) {
                            if (message.type === 'unstructured') {

                                this.loading = false
                                console.log(this.completed)
                                if (!message.unstructured.text) return;
                                console.log(message.unstructured.text);
                                
                                if (!this.completed) this.messages.push({sender: this.name, msg: message.unstructured.text })
                                else this.messages.push({sender: this.name, msg: this.completed })

                            } else if (message.type === 'structured' && message.structured.type === 'product') {

                                this.loading = false
                                console.log(this.completed)
                                if (!message.structured.text) return;
                                console.log(message.structured.text);
                                
                                if (!this.completed) this.messages.push({sender: this.name, msg: message.structured.text })
                                else this.messages.push({sender: this.name, msg: this.completed })

                            } else {
                                console.log('not implemented');
                            }
                        }
                        } else {
                            this.messages.push({sender: this.name, msg: 'Oops, something went wrong. Please try again.' })
                        }
                    })
                    .catch((error) => {
                        console.log('an error occurred', error);
                        this.messages.push({sender: this.name, msg: 'Oops, something went wrong. Please try again.' })
                    });

        }
    }
}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .hello {
    margin: 20px 25%;
    padding: 16px;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(100,100,100, .5);
    position: relative;
  }
  .messages {
    background: whitesmoke;
    margin: 10px;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 70px;
    overflow-y: auto ;
    max-height: calc(70vh - 50px);
  }
  .messages .message {
    margin: 20px 10px;
    padding: 20px;
    border-radius: 8px;
  }
  input, button {
    height: 45px;
    display: inline-block;
  }
  input {
    height: 35px;
    width: 71%;
    border-radius: 7px 0px 0px 7px;
    padding: 4px 20px;
  }
  button {

    width: 18%;
    border: 2px solid #2c3e50;
    border-radius: 20px;
    cursor: pointer;
    color: #2c3e50;
    transition: all ease .2s;

  }


  button:hover {
  background-color: #2c3e50;
  border: 2px solid #2c3e50;
  color: #E2E3E8;
}

  .sender {
    background: #a5e6c9;
    width: 70%;
    float: right;
  }
  .bot {
    background: rgb(157, 157, 250);
    width: 70%;
    float: left;
  }
  .input-container {
    width: 100%;
    height: 70px;
  }
  .loading {
    text-align: center;
    color: red;
    text-transform: uppercase;
    position: fixed;
    bottom: 0%;
    left: 0%;
    width: 100%;
  }
  </style>