<template>
    <div 
      class="details-section"
      @click="editingMode = true"
      v-click-outside="() => { editingMode = false }"
    >
      <!-- Title and text about consultant -->
      <div class="about-section">
        <div class="title-field">
          <h3>Om {{ profile?.firstname }}</h3>
          <img 
            src="./../../assets/icons/editIcon.svg"
            alt="Edit icon"
            :class="{ 'edit-icon' : !editingMode }"
          />
        </div>
  
        <p
          contenteditable="true"
          @blur="updateProfileField('bio', $event.target?.innerText)"
          class="editable-text"
        >
          {{ profile?.bio || "Enter you bio" }}
        </p>
      </div>
      
      <!-- birthyear and location with icons -->
      <div class="details-row">
        <div>
          <span>f. </span>
          <span
            contenteditable="true"
            @blur="updateProfileField('birthYear', $event.target?.innerText)"
            class="editable-text"
            >{{ profile?.birthYear || "Enter your birth year" }}</span
          >
        </div>

        <div>
          <img
            class="pin-icon"
            src="./../../assets/icons/pinIcon.svg"
            alt="Pin icon"
          />
          <span
            contenteditable="true"
            @blur="
              updateProfileField('placeOfResidence', $event.target?.innerText)
            "
            class="residence editable-text"
            >{{
              profile?.placeOfResidence || "Enter your place of residence"
            }}
          </span>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
const profile = inject("profile");
const updateProfileField = inject("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode

</script>

<style scoped>
  .details-section {
    height: 100%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
  }
  .about-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
  }

  .details-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    column-gap: 2.5rem;

    div {
      display: flex;
      align-items: center;
      column-gap: 0.4rem;
    }
    img {
      display: flex;
      align-items: center;
    }

    .residence {
      padding-top: 0.3rem;
    }
    
  }

  .pin-icon {
    width: 2rem;
    height: 2rem;
  }

  p {
    font-family: TiemposFineLight;
    font-size: 2rem;
    margin: 0;
  }

  

  span {
    color: var(--Black, #323231);
    font-family: NoAAftenScreen;
    font-size: 1.5rem;
  }

</style>