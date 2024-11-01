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
            @blur="updateProfileField('name', $event.target?.innerText)"
            class="editable-text"
            >
            {{ profile?.firstname + " " + profile?.lastname || "Enter your name" }}
            </h1>
            <h2
            contenteditable="true"
            @blur="updateProfileField('title', $event.target?.innerText)"
            class="editable-text"
            >
            {{ profile?.title || "Enter your title" }}
            </h2>
        </div>
        <img 
            src="./../../assets/icons/editIcon.svg"
            alt="Edit icon"
            :class="{ 'edit-icon' : !editingMode }"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import ProfilePicture from "./ProfilePicture.vue";
const profile = inject("profile");
const updateProfileField = inject("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode
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