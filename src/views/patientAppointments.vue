<template>
    <div>
            <h2>Upcoming Appointments</h2><br>
            <div>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Doctor</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Meeting Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="appointment in appointments" :key="appointment.appointmentID">
                        <td>{{appointment.doctorName}}</td>
                        <td>{{appointment.date}}</td>
                        <td>{{appointment.time}}</td>
                        <td>{{appointment.reason}}</td>
                        <td><a :href="appointment.meetingLink">Meeting Link</a></td>
                      </tr>
                    </tbody>
                  </table>
            </div>
    </div>
</template>
    
<script>    
    import axios from 'axios'
    import Auth from '@aws-amplify/auth'

    
    export default {
        name: 'appointments',
        mounted(){
            Auth.currentUserInfo()
            .then(res => {
                this.userID = res.username;
                console.log(this.userID);
                axios.get('https://dq9js2i730.execute-api.us-east-1.amazonaws.com/prod/patient/' + this.userID+ '/getAppointments')
                .then(function(response)  { 
                    this.appointments = response.data;
                    console.log(response.data);
                }.bind(this)).catch(error => { 
                    console.log(error)
                })   
            })
            .catch(err => {
                console.error(err);
            })
        },
        data() {
            return {       
                appointments: {},
                userID: ""
            }
        },
    }
</script>