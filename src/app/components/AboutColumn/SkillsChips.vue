<template>
    <div
    class="skills-section"
    @click="editingMode = true"
    v-click-outside="() => { editingMode = false }"
    >
    <div class="title-field">
        <h3
            contenteditable="true"
            @blur="editingMode && updateProfile('skillsTitle', ($event.target as HTMLElement)?.innerText)"
            class="editable-text"
        >Ekspertise innen</h3>
        <img 
            src="./../../assets/icons/EditIcon.svg"
            alt="Edit icon"
            :class="{ 'edit-icon' : !editingMode }"
        />
        
    </div>
        <ul>
            <li 
                v-for="(skill, index) in profile?.skills" :key="skill"
                @mouseenter="hoverEvent(index)"
                @mouseleave="hoverEvent(-1)"
            >
            <div>
                <p
                :contenteditable="editingMode"
                @blur="editingMode && updateProfile('skills['+index+']', ($event.target as HTMLElement)?.innerText)"
                :class="{ 'editable-text': editingMode }"
                >
                {{ skill }}
                </p>
                
                <!-- Delete button, only visible on hover -->
                <span v-if="editingMode && hoveredIndex === index" @click="removeSkill(index)" class="remove-btn">
                    &times; <!-- This represents the X -->
                </span>

            </div>
        </li>
        <li 
            v-if="editingMode" 
            class="add-skill-button"
            @click="addSkill"
        >
            <img 
                src="./../../assets/icons/AddIcon.svg"
                alt="Add icon"
                class="add-icon"
            />
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
// Injecting reactive profile object and update function
const editingMode = ref(false); // To track if the user is in editing mode
const hoveredIndex = ref(-1); // To track which item is being hovered
const profile = inject<ProfileToRender>("profile");
const updateProfileField = inject<(field: string, value: any) => void>("updateProfileField");

const updateProfile = (field: string, value: any) => {
  if (updateProfileField) {
    if (!profile) return;
      if(field === 'skills') {
        profile.skills = value;
        return;
      }
      // Split the fieldPath by dots or array-like syntax (e.g., skills[1].projectName)
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
      if (pathArray[0] === 'skills') {
        profile.skills = [...profile?.skills || []];
      }
    }
};

// Hover event handler
function hoverEvent(index: number) {
  hoveredIndex.value = index;
}

// Add skill handler
function addSkill() {
    if (profile?.skills) {
    profile.skills.push('Ny ekspertise'); // Add an empty skill
  }

}

// Remove skill handler
function removeSkill(index: number) {
  if (profile?.skills) {
    profile.skills.splice(index, 1); // Remove the skill at the given index
  }
}

</script>

<style scoped>
    h3 {
        color: var(--Crazy-Blue, #2a45ee);
    }
    .skills-section {
        margin-top: 1rem;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
    }

    ul {
        margin: 0.3rem 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
        align-self: stretch;
        gap: 0.3rem;

        li {
            width: auto; 
            max-height: 3.6rem;
            position: relative;
            display: flex;
            padding: 0.7rem 1rem;
            border-radius: 40px;
            justify-content: center;
            border: 1px solid var(--Crazy-Blue, #2a45ee);
            background: var(--White, #fff);
            box-sizing: border-box;
            gap: 0.5rem;
        }

        p {
            color: var(--Crazy-Blue, #2a45ee);
            font-size: 0.6rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 0.36px;
        }

    }

    .remove-btn {
        position: absolute;
        top: -0.5rem; /* Adjust as needed */
        right: -0.5rem; /* Adjust as needed */
        width: 1.2rem;
        height: 1.2rem;
        padding: 0 0 0.2rem 0;
        background-color: var(--Crazy-Blue, #2a45ee);;
        border: none;
        color: white;
        border-radius: 50%;
        font-size: 1.2rem;
        text-align: center;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-skill-button {
        border: 1.5px dashed var(--Ash, #645E57);
        width: auto; 
        height: 2.3rem;

        p {
            color: #645E57;
            font-size: 0.7rem;
        }
    }
    .add-icon {
        width: 0.7rem;
        height: 0.7rem;
        justify-content: center;
    }
</style>