<template>
  <card class="card" title="Edit Profile">
    <hr>
    <div class="sensor-data">
        <h2>Sensor Data:</h2>
        <div>
          <div class="datablock">
            <h3 class="title">Average Excercise Level: 
                <small>{{patient.sensor_avg_exercise_level}}</small>
            </h3>
          </div>
        </div>
        <br>
        <div>
          <div class="datablock">
            <h3 class="title">Average Heart Rate: 
                <small>{{patient.sensor_avg_heart_rate}}</small>
            </h3>
          </div>
        </div>
        <br>
        <div>
          <div class="datablock">
            <h3 class="title">Average Oxygen Saturation: 
                <small>{{patient.sensor_avg_oxygen_saturation}}</small>
            </h3>
          </div>
        </div>
        <br>
        <div>
          <div class="datablock">
            <h3 class="title">Average Sleep Duration: 
                <small>{{patient.sensor_avg_sleep_duration}}</small>
            </h3>
          </div>
        </div>
        <br>
        <div>
          <div class="datablock">
            <h3 class="title">Average Steps: 
                <small>{{patient.sensor_avg_steps}}</small>
            </h3>
          </div>
        </div>
        <br>
    </div>
    <hr>
    <div class="vitals-data">
        <h2>Vitals:</h2>
        <div class="datablock">
            <h3 class="title">Average Heart Rate: 
                <small>{{patient.vitals_avg_heart_rate}}</small>
            </h3>
        </div>
        <br>
        <div class="datablock">
            <h3 class="title">Most Recent Blood Pressure: 
                <small>{{patient.vitals_blood_pressure}}</small>
            </h3>
        </div>
        <br>
        <div class="datablock">
            <h3 class="title">Height: 
                <small>{{patient.vitals_height}}</small>
            </h3>
        </div>
        <br>
        <div class="datablock">
            <h3 class="title">Weight: 
                <small>{{patient.vitals_weight}}</small>
            </h3>
        </div>
        <br>
        <div class="datablock">
            <h3 class="title">O2 Saturation: 
                <small>{{patient.vitals_oxygen_saturation}}</small>
            </h3>
        </div>
        <br>
        <div class="datablock">
            <h3 class="title">Respirartory Rate: 
                <small>{{patient.vitals_resp_rate}}</small>
            </h3>
        </div>
        <br>
        <div class="datablock">
            <h3 class="title">Temperature: 
                <small>{{patient.vitals_temp}}</small>
            </h3>
        </div>
    </div>
  </card>
</template>
<script>
import Auth from '@aws-amplify/auth'
import axios from 'axios'

export default {
  mounted(){
    this.patientID = this.$route.params.patientID,
    Auth.currentUserInfo()
      .then(res => {
          this.userID = res.username;
          console.log(this.userID);
          axios.get('https://dq9js2i730.execute-api.us-east-1.amazonaws.com/prod/doctor/' + this.userID+ '/getPatientTable')
          .then(function(response)  { 
              this.patients = response.data;
              this.patient = this.patients.find(p => p.patient_id === this.patientID)
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
      patient: {}
    };
  },
};
</script>
<style>
.sensor-data {
  /* text-align: right; */
}
.vitals-data {
  /* text-align: right; */
}
</style>
