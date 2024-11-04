<template>
    <div 
        class="experience-section"
        @click="editingMode = true"
        v-click-outside="() => { editingMode = false }"
    >
        <div class="title-field">
            <h2
                contenteditable="true"
                @blur="updateProfile('experiencesTitle', ($event.target as HTMLElement)?.innerText)"
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
        <li v-for="experience in profile?.experiences" :key="experience.projectName">
          <div class="h3EditableTitle">
            <h3
              contenteditable="true"
              @blur="updateProfile('experiences.startDate', ($event.target as HTMLElement)?.innerText)"
              class="editable-text"
            >
              {{ experience.startDate ? formatDate(experience.startDate) : 'MM:ÅÅ' }}
            </h3>

            <h3>-</h3>

            <h3
            contenteditable="true"
              @blur="updateProfile('experiences.endDate', ($event.target as HTMLElement)?.innerText)"
              class="editable-text"
            >  
              {{ experience.endDate ? formatDate(experience.endDate) : 'MM:ÅÅ' }} 
            </h3>

            <h3 class="colon">:</h3>

            <h3
            contenteditable="true"
              @blur="updateProfile('experiences.projectName', ($event.target as HTMLElement)?.innerText)"
              class="editable-text"
            >
              {{ experience.projectName || "Prosjeknavn, Kunde" }}
            </h3>

          </div>

          <p
            contenteditable="true"
            @blur="updateProfile('experiences.description', ($event.target as HTMLElement)?.innerText)"
            class="editable-text"
          >{{ experience?.description || "Legg til tekst" }}</p>
        </li>
      </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { formatDate } from "../../helpers";
import { ProfileToRender } from "../../types";
const profile = inject<ProfileToRender>("profile");
const updateProfileField = inject<(field: string, value: any) => void>("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode

const updateProfile = (field: string, value: any) => {
  if (updateProfileField) {
    updateProfileField(field, value);
  }
};
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
            letter-spacing: 0.8px;
            line-height: 30px;
            text-align: left;
            }
        }
    }
}
</style>
