<template>
    <div class="personal-section">
        <div class="profile-picture">
            <ProfilePicture />
        </div>

        <div 
        class="name-field"
        @click="editingMode = true"
        v-click-outside="() => { editingMode = false }"
        >
        
            <h1
            contenteditable="true"
            ref="nameField"
            @keypress="clearDefaultText('name')"
            @blur="updateAndRestoreDefaultText('name', $event)"
            class="editable-text"
            >
            {{ (profile?.name || "Fornavn Etternavn") }}
            </h1>
            <h2
            contenteditable="true"
            ref="jobTitleField"
            @keypress="clearDefaultText('jobTitle')"
            @blur="updateAndRestoreDefaultText('jobTitle', $event)"
            class="editable-text"
            >
            {{ profile?.jobTitle || "Tittel" }}
            </h2>
        </div>
        <img 
            src="./../../assets/icons/EditIcon.svg"
            alt="Edit icon"
            :class="{ 'edit-icon' : !editingMode }"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import ProfilePicture from "./ProfilePicture.vue";
import { ProfileToRender } from "../../types";
const profile = inject<ProfileToRender>("profile");
const updateProfileField = inject<(field: string, value: any) => void>("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode

const updateProfile = (field: string, value: any) => {
  if (updateProfileField) {
    updateProfileField(field, value);
  }
};

// Refs for the editable fields
const nameField = ref<HTMLElement | null>(null);
const jobTitleField = ref<HTMLElement | null>(null);

// Clear default text on focus if it's still set
const clearDefaultText = (field: string) => {
  const element = field === 'name' ? nameField.value : jobTitleField.value;
  if (element) {
    const defaultValue = field === 'name' ? 'Fornavn Etternavn' : 'Tittel';
    if (element.innerText === defaultValue) {
      element.innerText = ''; // Clear the default text
    }
  }
};

const updateAndRestoreDefaultText = (field: string, event: Event) => {
  const element = event.target as HTMLElement;
  const newValue = element.innerText.trim();

  // Update the profile
  if (newValue) {
    updateProfile(field, newValue);
  } else {
    // Restore default text if the field is empty
    if (field === 'name') {
      element.innerText = 'Fornavn Etternavn';
    } else if (field === 'jobTitle') {
      element.innerText = 'Tittel';
    }
  }
};

</script>

<style scoped>
    .personal-section {
        width: 100%;
        column-gap: 1.5rem;
        display: flex;
        align-items: flex-start;
    }
    .name-field {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
    }
    .edit-icon {
        right:0.31rem;
    }

    h1,
    h2 {
        margin: 0;
        white-space: nowrap;
    }

    h2 {
        color: blue;
    }

</style>