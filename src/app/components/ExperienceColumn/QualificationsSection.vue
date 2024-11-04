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
                {{profile?.qualificationsTitle || "Utdanning, kurs og sertifiseringer"}}
            </h2>
            <img 
                src="./../../assets/icons/editIcon.svg"
                alt="Edit icon"
                :class="{ 'edit-icon' : !editingMode }" 
            />
        </div>
      <ul>
        <li v-for="qualification in profile?.qualifications" :key="qualification.detail">
          <div class="h3EditableTitle">
            <h3
              contenteditable="true"
              @blur="updateProfile('qualifications.label', ($event.target as HTMLElement)?.innerText)"
              class="editable-text"
            >{{ qualification?.label || "Utdanning, kurs eller sertifiseringsnavn" }}
            </h3>

            <h3 class="colon">:</h3>

            <p
            contenteditable="true"
            @blur="updateProfile('qualifications?.detail', ($event.target as HTMLElement)?.innerText)"
            class="editable-text"
            >{{ qualification.detail || "Sted, År eller Beskrivelse"}}</p>
          </div>
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
    updateProfileField(field, value);
  }
};
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