<template>
    <div
    class="skills-section"
    @click="editingMode = true"
    v-click-outside="() => { editingMode = false }"
    >
    <div class="title-field">
        <h3
        contenteditable="true"
        @blur="editingMode && updateProfileField('skillsTitle', $event.target?.innerText)"
        class="editable-text"
        >Ekspertise innen</h3>
        <img 
            src="./../../assets/icons/editIcon.svg"
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
                @blur="editingMode && updateProfileField('skill', $event.target?.innerText)"
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
// Injecting reactive profile object and update function
const profile = inject("profile");
const hoveredIndex = ref(-1); // To track which item is being hovered
const updateProfileField = inject("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode

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
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
    }

    ul {
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
        align-self: stretch;
        gap: 0.7rem;

        li {
            position: relative;
            display: flex;
            padding: 1rem 2rem;
            border-radius: 40px;
            justify-content: center;
            border: 1.5px solid var(--Crazy-Blue, #2a45ee);
            background: var(--White, #fff);
            box-sizing: border-box;
            width: auto; 
            max-height: 3.6rem;
            gap: 0.75rem;
        }

        p {
        color: var(--Crazy-Blue, #2a45ee);
        font-size: 1.2rem;
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
        width: 2rem;
        height: 2rem;
        padding: 0 0 0.3rem 0.05rem;
        background-color: var(--Crazy-Blue, #2a45ee);;
        border: none;
        color: white;
        border-radius: 50%;
        font-size: 2rem;
        text-align: center;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-skill-button {
        border: 1.5px dashed var(--Ash, #645E57);

        p {
            color: #645E57;
        }
    }
    .add-icon {
        width: 1.3rem;
        height: 1.3rem;
        justify-content: center;
    }
</style>