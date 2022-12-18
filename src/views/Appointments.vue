<template>
    <div>
            <h2>Upcoming Appointments</h2>
            <div>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Meeting Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="appointment in appointments" :key="appointment.appointmentID">
                        <td>{{appointment.patientName}}</td>
                        <td>{{appointment.date}}</td>
                        <td>{{appointment.time}}</td>
                        <td>{{appointment.reason}}</td>
                        <td>{{appointment.meetingLink}}</td>
                      </tr>
                    </tbody>
                  </table>
            </div>
    </div>
</template>
    
<script>    
    import axios from 'axios'
    
    export default {
        name: 'appointments',
        mounted(){
            axios.get('https://dq9js2i730.execute-api.us-east-1.amazonaws.com/prod/doctor/' + this.$route.params.doctorID + '/getAppointments')
            .then(function(response)  { 
                this.appointments = response.data;
                console.log(response.data);
            }.bind(this)).catch(error => { 
                console.log(error)
            })   
        },
        data() {
            return {       
                appointments: {}
            }
        },
    }
    </script>