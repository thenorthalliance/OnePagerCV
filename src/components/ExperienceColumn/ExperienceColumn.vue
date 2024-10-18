<template>
  <div class="column-right">

    <div id="experience-section">
      <h2>Utvalgt erfaring</h2>
      <ul>
        <li v-for="experience in profile.experiences" :key="experience.projectName">
          <h3>{{ experience.startDate ? formatDate(experience.startDate) : '' }} - {{ experience.endDate ?
            formatDate(experience.endDate) : '' }}: {{ experience.projectName }}</h3>
          <p>{{ experience.description }}</p>
        </li>
      </ul>
    </div>

    <div id="qualifications-section">
      <h2>Utdanning, kurs og sertifiseringer</h2>
      <ul>
        <li v-for="qualification in profile.qualifications" :key="qualification.detail">
          <h3>{{ qualification.label }}:</h3>
          <p>{{ qualification.detail }}</p>
        </li>
      </ul>
    </div>

  </div>

</template>

<script setup lang="ts">
  import { ProfileToRender } from '../../types';
  import { formatDate } from './../../helpers';

  defineProps<{
    profile: ProfileToRender;
  }>();
</script>

<style scoped>

.column-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  /* min-height: 59rem; */
  flex: 1 0 0;
  align-self: stretch;
  align-items: flex-start;
  border-radius: 20px;
  background: var(--Light-Blue, #DDE4FF);
}

#experience-section {

  ul {
    gap: 1rem;
    padding: 0;

    li {
      margin-bottom: 1.4rem;
      
      h3 {
        margin: 0 0 0.6rem 0;
        line-height: normal;
        text-align: left;
      }

      p {
        margin: 0;
        letter-spacing: 1.2px;
        line-height: 30px;
        text-align: left;
      }
    }
  }
}

#qualifications-section {
  ul {
    padding: 0;

    li {
      display: flex;
      column-gap: 0.5em;
      margin-bottom: 1rem;

      h3 {
        letter-spacing: -0.48px;
      }

      p {
        align-self: flex-start;
        margin: 0;
        letter-spacing: 1.2px;
        line-height: 30px;
      }
    }
  }
}

</style>