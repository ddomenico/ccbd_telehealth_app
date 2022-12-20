<template>
    <div>
            <h2>Make Appointment</h2>
            <div>
                <input type="date" v-model="input.date" />
                <input type="time" v-model="input.time" /> <br>
                Doctor Name <br>
                <input type="text" v-model="input.doctor" placeholder="Doctor Name"/> <br>
                Reason <br>
                <input type="text" v-model="input.reason" placeholder="Reason"/> <br>
                
                <button v-on:click="submit()">Submit</button>
            </div>
            <h2>{{ status }}</h2>
    </div>
</template>
    
<script>    
    import axios from 'axios'
    import Auth from '@aws-amplify/auth'

    
    export default {
        name: 'appointments',
        mounted(){
            this.input.date = "2022-12-20",
            this.input.time = "15:00",
            this.input.doctor = "Frank Yang",
            this.input.reason = "Fever"

            Auth.currentUserInfo()
            .then(res => {
                this.userID = res.username;
                console.log(this.userID);
            })
            .catch(err => {
                console.error(err);
            })
        },
        data() {
            return {
                input: {
                    date: "",
                    time: "",
                    doctor: "",
                    reason: ""
                },
                status: "",
                userID: ""
            }
        },
        methods: {
        submit() {
            var data = {
                "date": this.input.date,
                "time": this.input.time,
                "doctor": this.input.doctor,
                "reason": this.input.reason
            };
            console.log(data);
            var url = "https://dq9js2i730.execute-api.us-east-1.amazonaws.com/prod/patient/" + this.userID + "/makeAppointment";
            axios.post(url, data)
            .then(function(response)  { 
                console.log(response)
                if (response.status == 200) {
                    this.status = response.data
                } 
                else {
                    this.status = "Appointment Failed"
                }
            }.bind(this)).catch(error => { 
                console.log(error)
            })            
        }
    }
    }
    </script>