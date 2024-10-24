<template>
    <div 
        class="experience-section"
        @click="editingMode = true"
        v-click-outside="() => { editingMode = false }"
    >
        <div class="title-field">
            <h2
                contenteditable="true"
                @blur="updateProfileField('experiencesTitle', $event.target?.innerText)"
                class="editable-text"
            >
                {{profile?.experiencesTitle || "Utvalgt erfaring"}}
            </h2>
            <img 
                src="./../../assets/icons/editIcon.svg"
                alt="Edit icon"
                :class="{ 'edit-icon' : !editingMode }"
            />
        </div>
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
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { formatDate } from "../../helpers";
const profile = inject("profile");
const updateProfileField = inject("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode
</script>

<style scoped> 

.experience-section {
    width: 100%;
    
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
</style>
