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
          id="descriptionTitleField"
          ref="descriptionTitleField"
          @keypress="clearDefaultText(descriptionTitleField, 'Navn')"
          @blur="updateAndRestoreDefaultText(descriptionTitleField, 'Navn')"
          class="editable-text about-title"
          >Om {{ profile?.name || "Navn" }}</h3>
          <img 
            src="./../../assets/icons/EditIcon.svg"
            alt="Edit icon"
            :class="{ 'edit-icon' : !editingMode }"
          />
        </div>
  
        <p
          contenteditable="true"
          id="descriptionField"
          ref="descriptionField"
          @keypress="clearDefaultText(descriptionField, 'Legg til tekst')"
          @blur="updateAndRestoreDefaultText(descriptionField, 'Legg til tekst')"
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
            id="birthYearField"
            ref="birthYearField"
            @keypress="clearDefaultText(birthYearField, 'ÅÅÅÅ')"
            @blur="updateAndRestoreDefaultText(birthYearField, 'ÅÅÅÅ')"
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
            id="residenceField"
            ref="residenceField"
            @keypress="clearDefaultText(residenceField, 'Bosted')"
            @blur="updateAndRestoreDefaultText(residenceField, 'Bosted')"
            class="residence editable-text"
            >{{
              profile?.residence || "Bosted"
            }}
          </span>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { ProfileToRender } from "../../types";
import { clearDefaultText } from "../../helpers";
const profile = inject<ProfileToRender>("profile");
const updateProfileField = inject<(field: string, value: any) => void>("updateProfileField");
const editingMode = ref(false); // To track if the user is in editing mode
// Refs for the editable fields
const descriptionTitleField = ref<HTMLElement | null>(null);
const descriptionField = ref<HTMLElement | null>(null);
const birthYearField = ref<HTMLElement | null>(null);
const residenceField = ref<HTMLElement | null>(null);

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
  .details-section {
    height: 100%;
    width: 100%;
    margin-top: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
  }
  .about-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    width: 1.2rem;
    height: 1.2rem;
  }

  p {
    font-family: NoAAftenScreen;
    font-size: 1.2rem;
    margin: 0;
  }

  span {
    color: var(--Black, #323231);
    font-family: NoAAftenScreen;
    font-size: 0.8rem;
  }

</style>