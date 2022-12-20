<template>
    <div class="profile">
    <div class="row">
      <div class="column">
        <user-card>
        </user-card>
      </div>
      <div class="column">
        <patient-info-block>
        </patient-info-block>
      </div>
    </div>
    <div class="column">
        <patient-data-block>
        </patient-data-block>
    </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import UserCard from "../components/UserCard.vue";
import PatientInfoBlock from "../components/PatientInfoBlock.vue";
import PatientDataBlock from "../components/PatientDataBlock.vue";
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  components: {
    UserCard,
    PatientInfoBlock,
    PatientDataBlock,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
  },
}
</script>

<style>
.profile{
  padding-top: 10%;
}
:root {
  --ms-main-color: #70bcff;
  --ms-tag-color: var(--ms-main-color);
  --ms-option-bg-selected: var(--ms-main-color);
  --ms-option-bg-selected-pointed: var(--ms-main-color);
  --ms-ring-color: var(--ms-main-color) 30;
  --ms-spinner-color: var(--ms-main-color);
}
.tab-inactive {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
}
</style>
