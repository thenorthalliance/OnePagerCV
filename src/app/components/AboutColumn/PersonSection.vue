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
            id="nameField"
            ref="nameField"
            @keypress="clearDefaultText(nameField, 'Fornavn Etternavn')"
            @blur="updateAndRestoreDefaultText(nameField, 'Fornavn Etternavn')"
           class="editable-text"

            >
            {{ (profile?.name || "Fornavn Etternavn") }}
            </h1>
            <h2
            contenteditable="true"
            id="jobTitleField"
            ref="jobTitleField"
            @keypress="clearDefaultText(jobTitleField, 'Tittel')"
            @blur="updateAndRestoreDefaultText(jobTitleField, 'Tittel')"
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
import { clearDefaultText } from "../../helpers";
const profile = inject<ProfileToRender>("profile");
const updateProfileField = inject<(field: string, value: any) => void>("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode
// Refs for the editable fields
const nameField = ref<HTMLElement | null>(null);
const jobTitleField = ref<HTMLElement | null>(null);

const updateProfile = (field: string, value: any) => {
  if (updateProfileField) {
    updateProfileField(field, value);
  }
};

const updateAndRestoreDefaultText = (elementRef: HTMLElement | null, defaultValue: string) => {
    const fieldName = elementRef?.id.replace('Field', ''); // This will give us the field name 
    if (elementRef) {
        const newValue = elementRef.innerText.trim();
        // Update the profile if there's a new value
        if (newValue) {
            updateProfile(fieldName ?? 'noElement', newValue);  // We can pass a field identifier as needed
        } else {
            // Restore default text if the field is empty
            elementRef.innerText = defaultValue;
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