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
                {{profile?.experienceTitle || "Utvalgt erfaring"}}
            </h2>
            <img 
                src="./../../assets/icons/EditIcon.svg"
                alt="Edit icon"
                :class="{ 'edit-icon' : !editingMode }"
            />
        </div>
      <ul>
        <li v-for="(experience, index) in profile?.experiences" :key="experience.projectName">
          <div class="h3EditableTitle">
            <h3
              contenteditable="true"
              @blur="updateProfile('experiences['+index+'].startDate', ($event.target as HTMLElement)?.innerText)"
              class="editable-text"
            >
              {{ experience.startDate || 'MM.ÅÅ' }}
            </h3>

            <h3>-</h3>

            <h3
            contenteditable="true"
              @blur="updateProfile('experiences['+index+'].endDate', ($event.target as HTMLElement)?.innerText)"
              class="editable-text"
            >  
              {{ experience.endDate || 'MM.ÅÅ' }} 
            </h3>

            <h3 class="colon">:</h3>

            <h3
            contenteditable="true"
              @blur="updateProfile('experiences['+index+'].projectName', ($event.target as HTMLElement)?.innerText)"
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
import { ProfileToRender } from "../../types";
const profile = inject<ProfileToRender>("profile");
const updateProfileField = inject<(field: string, value: any) => void>("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode

const updateProfile = (field: string, value: any) => {
  if (updateProfileField) {
    if (!profile) return;

      if(field === 'experienceTitle') {
        // updateProfileField('experienceTitle', value);
        profile.experienceTitle = value;
        return;
      }
      // Split the fieldPath by dots or array-like syntax (e.g., experiences[1].projectName)
      const pathArray = field.replace(/\[(\d+)\]/g, '.$1').split('.');

      let currentLevel: any = profile;

      for (let i = 0; i < pathArray.length - 1; i++) {
        const key = pathArray[i];
        if (!(key in currentLevel)) {
          console.error(`Key ${key} not found in profile`);
          return;
        }
        currentLevel = currentLevel[key];
      }

      const lastKey = pathArray[pathArray.length - 1];
      currentLevel[lastKey] = value;

      // Trigger reactivity by reassigning the updated array if needed
      if (pathArray[0] === 'experiences') {
        profile.experiences = [...profile?.experiences || []];
      }
    }
  
};
</script>


<style scoped> 
.experience-section {
    width: 100%;
    min-height: 20rem;

    h2 {
      font-size: 1.3rem;
    }

    ul {
    gap: 1rem;
    padding: 0;

        li {
            margin-bottom: 1.4rem;

            .colon{
            margin-left: -0.5em;
            }
            
            h3 {
            margin: 0 0 0.2rem 0;
            line-height: normal;
            text-align: left;
            }

            p {
            margin: 0;
            letter-spacing: 0.8px;
            line-height: 1.5rem;
            text-align: left;
            }
        }
    }
}
</style>
