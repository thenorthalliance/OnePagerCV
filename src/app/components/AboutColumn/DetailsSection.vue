<template>
    <div 
      class="details-section"
      @click="editingMode = true"
      v-click-outside="() => { editingMode = false }"
    >
      <!-- Title and text about consultant -->
      <div class="about-section">
        <div class="title-field">
          <h3
          contenteditable="true"
          @blur="
            updateProfile('descriptionTtile', ($event.target as HTMLElement)?.innerText)"
          class="editable-text about-title"
          >Om {{ profile?.firstname || "Navn" }}</h3>
          <img 
            src="./../../assets/icons/EditIcon.svg"
            alt="Edit icon"
            :class="{ 'edit-icon' : !editingMode }"
          />
        </div>
  
        <p
          contenteditable="true"
          @blur="
            updateProfile('description', ($event.target as HTMLElement)?.innerText)"
          class="editable-text"
        >
          {{ profile?.description || "Legg til tekst" }}
        </p>
      </div>
      
      <!-- birthyear and location with icons -->
      <div class="details-row">
        <div>
          <span>f. </span>
          <span
            contenteditable="true"
            @blur="updateProfile('birthYear', ($event.target as HTMLElement)?.innerText)"
            class="editable-text"
            >{{ profile?.birthYear || "ÅÅÅÅ" }}</span
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
              updateProfile('placeOfResidence', ($event.target as HTMLElement)?.innerText)
            "
            class="residence editable-text"
            >{{
              profile?.placeOfResidence || "Bosted"
            }}
          </span>
        </div>
      </div>
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
  .details-section {
    height: 100%;
    width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
  }
  .about-section {
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