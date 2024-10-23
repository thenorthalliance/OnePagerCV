<template>
    <div 
      class="details-section"
      @click="editingMode = true"
      v-click-outside="() => { editingMode = false }"
    >
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
            }}</span
          >
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.details-row {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  align-items: center;
}

.pin-icon {
  margin-top: 0.1rem;
  width: 2rem;
  height: 2rem;
}

.residence {
  margin-top: 0.6rem;
}

p {
  font-family: TiemposFineLight;
  font-size: 1.5rem;
  margin: 0;
}

div {
  margin-top: auto;
  display: flex;
  flex-direction: row;
  column-gap: 0.4rem;
}

span {
  color: var(--Black, #323231);
  font-family: NoAAftenScreen;
  font-size: 1rem;
}

</style>