<template>
    <div 
        class="experience-section"
        @click="editingMode = true"
        v-click-outside="() => { editingMode = false }"
    >
        <div class="title-field">
            <h2
                contenteditable="true"
                @blur="updateProfile('experienceTitle', ($event.target as HTMLElement)?.innerText)"
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
        <li v-for="(experience, index) in profile?.experiences" :key="experience.projectName"
            @mouseenter="hoverEvent(index)"
            @mouseleave="hoverEvent(-1)"
        >
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
            <!-- Delete button, only visible on hover -->
            <span v-if="editingMode" @click="removeExperience(index)" class="remove-btn">
                &times; <!-- This represents the X -->
            </span>

          </div>

          <p
            contenteditable="true"
            @blur="updateProfile('experiences['+index+'].description', ($event.target as HTMLElement)?.innerText)"
            class="editable-text"
          >
            {{ experience.description || "Legg til tekst" }}
          </p>

        </li>
        <li 
            v-if="editingMode" 
            class="add-experience-button"
            @click="addExperience"
            >
            <p>
                Legg til
            </p>
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
const hoveredIndex = ref(-1); // To track which item is being hovered

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

// Hover event handler
function hoverEvent(index: number) {
  hoveredIndex.value = index;
}

function addExperience() {
  if (!profile) return;
  profile.experiences = [
    ...(profile.experiences || []),// Use an empty array as a fallback if experiences is undefined
    {
      startDate: '',
      endDate: '',
      projectName: '',
      description: '',
    },
  ];
};

function removeExperience(index: number) {
  if (!profile) return;
  (profile.experiences || []).splice(index, 1);
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

    .add-experience-button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 1rem;
        border-radius: 40px;
        background: var(--Ash, #645E57);
        color: var(--White, #fff);
        font-size: 0.8rem;
        font-weight: 500;
        cursor: pointer;

        p {
          color: var(--White, #fff)
        }
    }

    .remove-btn {
        position: relative;
        top: -0.25rem;
        right: -1rem;
    }
}
</style>
