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
          <strong>{{ qualification.label }}:</strong>
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
  gap: 60px;
  min-height: 59rem;
  flex: 1 0 0;
  align-self: stretch;
  align-items: flex-start;
  border-radius: 20px;
  background: var(--Light-Blue, #DDE4FF);
}

#experience-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 1rem;
  ul {
    padding: 0;

    li {
      margin-bottom: 1rem;

      h4 {
        margin: 0;
        font-size: smaller;
      }

      p {
        margin: 0;
        font-size: smaller;
      }
    }
  }
}

#qualifications-section {
  ul {
    padding: 0;

    li {
      margin-bottom: 1rem;
      display: flex;
      column-gap: 0.5em;

      strong {
        font-size: smaller;
      }

      p {
        margin: 0;
        font-size: smaller;
      }
    }
  }
}

</style>