<template>
  <div class="column-right">

    <div id="experience-section">
      <h2
        contenteditable="true"
        @blur="updateProfileField('experiencesTitle', $event.target?.innerText)"
        class="editable-text"
      >{{profile?.experiencesTitle || "Utvalgt erfaring"}}
    </h2>
      <ul>
        <li v-for="experience in profile.experiences" :key="experience.projectName">
          <div class="experienceTitle">
          <h3
            contenteditable="true"
            @blur="updateProfileField('experiences.startDate', $event.target?.innerText)"
            class="editable-text"
          >
            {{ experience.startDate ? formatDate(experience.startDate) : 'MM:YY' }}
          </h3>
          <h3> - </h3>
          <h3
          contenteditable="true"
            @blur="updateProfileField('experiences.endDate', $event.target?.innerText)"
            class="editable-text"
          >  
            {{ experience.endDate ? formatDate(experience.endDate) : 'MM:YY' }} 
          </h3>
          <h3 class="colon">:</h3>
          <h3
          contenteditable="true"
            @blur="updateProfileField('experiences.projectName', $event.target?.innerText)"
            class="editable-text"
          >
            {{ experience.projectName || "Legg til et prosjektnavn" }}
          </h3>
        </div>
          <p
          contenteditable="true"
          @blur="updateProfileField('experiences.description', $event.target?.innerText)"
          class="editable-text"
          >{{ experience?.description || "Legg til en beskrivelse" }}</p>
        </li>
      </ul>
    </div>

    <div id="qualifications-section">
      <h2
        contenteditable="true"
        @blur="updateProfileField('qualificationsTitle', $event.target?.innerText)"
        class="editable-text"
      >
      {{profile?.qualificationsTitle || "Utdanning, kurs og sertifiseringer"}}
      </h2>
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
import { inject } from 'vue';
import { formatDate } from './../../helpers';

// Injecting reactive profile object and update function
const profile = inject('profile');
const updateProfileField = inject('updateProfileField');

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

      .experienceTitle {
        display: flex;
        column-gap: 0.5em;
        /* margin-bottom: 1rem; */

        h3 {
          letter-spacing: -0.48px;
        }
      }

      .colon {
        margin-left: -0.33em;
      }
      

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