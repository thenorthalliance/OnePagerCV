<template>
    <div class="column-right">
        <div id="experience-section">
          <h3>Utvalgt erfaring</h3>
          <ul>
            <li v-for="experience in profile.experiences" :key="experience.projectName">
              <h4>{{ experience.startDate ? formatDate(experience.startDate) : '' }} - {{ experience.endDate ?
                formatDate(experience.endDate) : '' }}: {{ experience.projectName }}</h4>
              <p>{{ experience.description }}</p>
            </li>
          </ul>
        </div>

        <div id="qualifications-section">
          <h3>Utdanning, kurs og sertifiseringer</h3>
          <ul>
            <li v-for="qualification in profile.qualifications" :key="qualification.detail">
              <Strong>{{ qualification.label }}:</Strong>
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
    padding: 1.5rem 1.5rem 2rem 1.5rem;
    align-items: flex-start;
    gap: 60px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 20px;
    background: var(--Light-Blue, #DDE4FF);
}

#experience-section {
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