<template>
    <div
        class="qualifications-section"
        @click="editingMode = true"
        v-click-outside="() => { editingMode = false }"
    >
        <div class="title-field">
            <h2
                contenteditable="true"
                @blur="updateProfileField('qualificationsTitle', $event.target?.innerText)"
                class="editable-text"
            >
                {{profile?.qualificationsTitle || "Utdanning, kurs og sertifiseringer"}}
            </h2>
            <img 
                src="./../../assets/icons/editIcon.svg"
                alt="Edit icon"
                :class="{ 'edit-icon' : !editingMode }" 
            />
        </div>
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
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
const profile = inject("profile");
const updateProfileField = inject("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode
</script>

<style scoped>
    .qualifications-section {
        width: 100%;
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