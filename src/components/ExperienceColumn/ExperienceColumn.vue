<template>
  <div class="column-right">

    <ProjectDescription />
    <QualificationsSection />

  </div>

</template>

<script setup lang="ts">
import ProjectDescription from './ProjectDescription.vue';
import QualificationsSection from './QualificationsSection.vue';


</script>

<style scoped>
.column-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 3rem 2rem 3rem;
  flex: 1 0 0;
  align-self: stretch;
  align-items: flex-start;
  border-radius: 20px;
  background: var(--Light-Blue, #DDE4FF);
}

</style>