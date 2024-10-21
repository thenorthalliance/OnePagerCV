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
          <div class="h3EditableTitle">
            <h3
              contenteditable="true"
              @blur="updateProfileField('experiences.startDate', $event.target?.innerText)"
              class="editable-text"
            >
              {{ experience.startDate ? formatDate(experience.startDate) : 'MM:ÅÅ' }}
            </h3>

            <h3>-</h3>

            <h3
            contenteditable="true"
              @blur="updateProfileField('experiences.endDate', $event.target?.innerText)"
              class="editable-text"
            >  
              {{ experience.endDate ? formatDate(experience.endDate) : 'MM:ÅÅ' }} 
            </h3>

            <h3 class="colon">:</h3>

            <h3
            contenteditable="true"
              @blur="updateProfileField('experiences.projectName', $event.target?.innerText)"
              class="editable-text"
            >
              {{ experience.projectName || "Prosjeknavn, Kunde" }}
            </h3>

          </div>

          <p
          contenteditable="true"
          @blur="updateProfileField('experiences.description', $event.target?.innerText)"
          class="editable-text"
          >{{ experience?.description || "Legg til tekst" }}</p>
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
          <div class="h3EditableTitle">
            <h3
              contenteditable="true"
              @blur="updateProfileField('qualifications.label', $event.target?.innerText)"
              class="editable-text"
            >{{ qualification?.label || "Utdanning, kurs eller sertifiseringsnavn" }}
            </h3>

            <h3 class="colon">:</h3>

            <p
            contenteditable="true"
            @blur="updateProfileField('qualifications?.detail', $event.target?.innerText)"
            class="editable-text"
            >{{ qualification.detail || "Sted, År eller Beskrivelse"}}</p>
          </div>
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

.h3EditableTitle {
  display: flex;
  column-gap: 0.5em;
  /* margin-bottom: 1rem; */
  
  .colon {
    margin-left: -0.3em;
  }
  h3 {
    letter-spacing: -0.48px;
  }

}


#experience-section {

  ul {
    gap: 1rem;
    padding: 0;

    li {
      margin-bottom: 1.4rem;

      .colon{
        margin-left: -0.3em;
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