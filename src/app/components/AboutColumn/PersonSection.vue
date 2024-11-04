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
            @blur="updateProfile('name', ($event.target as HTMLElement)?.innerText)"
            class="editable-text"
            >
            {{ profile?.firstname + " " + profile?.lastname || "Enter your name" }}
            </h1>
            <h2
            contenteditable="true"
            @blur="updateProfile('title', ($event.target as HTMLElement)?.innerText)"
            class="editable-text"
            >
            {{ profile?.title || "Enter your title" }}
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