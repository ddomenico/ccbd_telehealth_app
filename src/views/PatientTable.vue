<template>
    <div>
            <h2>Patient Table</h2>
            <div>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Patient Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="patient in patients">
                        <td>{{patient.name}}</td>
                        <td><a :href="'/patient/' + patient.patient_id + '/report'">Report Link</a></td>
                      </tr>
                    </tbody>
                  </table>
            </div>
    </div>
</template>
    
<script>    
    import axios from 'axios'
    
    export default {
        name: 'patients',
        mounted(){
            axios.get('https://dq9js2i730.execute-api.us-east-1.amazonaws.com/prod/doctor/' + this.$route.params.doctorID + '/getPatientTable')
            .then(function(response)  { 
                this.patients = response.data;
                console.log(response.data);
            }.bind(this)).catch(error => { 
                console.log(error)
            })   
        },
        data() {
            return {       
                patients: {}
            }
        },
    }
    </script>