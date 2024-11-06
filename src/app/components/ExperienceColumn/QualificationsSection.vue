<template>
    <div
        class="qualifications-section"
        @click="editingMode = true"
        v-click-outside="() => { editingMode = false }"
    >
        <div class="title-field">
            <h2
                contenteditable="true"
                @blur="updateProfile('qualificationsTitle', ($event.target as HTMLElement)?.innerText)"
                class="editable-text"
            >
                {{profile?.qualificationTitle || "Utdanning, kurs og sertifiseringer"}}
            </h2>
            <img 
                src="./../../assets/icons/EditIcon.svg"
                alt="Edit icon"
                :class="{ 'edit-icon' : !editingMode }" 
            />
        </div>
      <ul>
        <li v-for="(qualification, index) in profile?.qualifications" :key="qualification?.label"
          @mouseenter="hoverEvent(index)"
          @mouseleave="hoverEvent(-1)"
        >
          <div class="h3EditableTitle">
            <h3
              contenteditable="true"
              @blur="updateProfile('qualifications['+index+'].label', ($event.target as HTMLElement)?.innerText)"
              class="editable-text"
            >{{ qualification.label || "Utdanning, kurs eller sertifiseringsnavn" }}
            </h3>

            <h3 class="colon">:</h3>

            <p
            contenteditable="true"
            @blur="updateProfile('qualifications['+index+'].detail', ($event.target as HTMLElement)?.innerText)"
            class="editable-text"
            >
              {{ qualification.detail || "Sted, År eller Beskrivelse"}}
            </p>
          </div>
          <!-- Delete button, only visible on hover -->
          <span v-if="editingMode" @click="removeQualification(index)" class="remove-btn">
            &times; <!-- This represents the X -->
          </span>
        </li>
        <li 
            v-if="editingMode" 
            class="add-qualification-button"
            @click="addQualification"
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

      if(field === 'qualifications') {
        profile.qualifications = value;
        return;
      }
      // Split the fieldPath by dots or array-like syntax (e.g., qualifications[1].label)
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
      if (pathArray[0] === 'qualifications') {
        profile.qualifications = [...profile?.qualifications || []];
      }
    }
};

// Hover event handler
function hoverEvent(index: number) {
  hoveredIndex.value = index;
}

function addQualification() {
  if (!profile) return;
  profile.qualifications = [
    ...(profile.qualifications || []),// Use an empty array as a fallback if experiences is undefined
    {
      label: '',
      detail: '',
    },
  ];
};

function removeQualification(index: number) {
  if (!profile) return;
  (profile.qualifications || []).splice(index, 1);
};
</script>

<style scoped>
    .qualifications-section {
        width: 100%;

        h2 {
          font-size: 1.3rem;
        }

        .add-qualification-button {
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
        bottom: -0.1rem;
        right: -1rem;
    }
    }
    ul {
        padding: 0;
    }
    li {
        display: flex;
        column-gap: 0.5em;
        margin-bottom: 1rem;    
    }
    h3 {
        letter-spacing: -0.48px;
    }
    p {
        align-self: flex-start;
        margin: 0;
        letter-spacing: 1.2px;
        line-height: 30px;
    }
</style>