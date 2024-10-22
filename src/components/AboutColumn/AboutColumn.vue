<template>
  <div class="column-left">
    <div id="personal-section">
      <div>
        <ProfilePicture />
      </div>
      <div>
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
    </div>

    <div id="skills-section">
      <h3>Expertise innen</h3>

      <SkillsChips />
    </div>

    <div id="details-section">
      <h3>Om {{ profile?.firstname }}</h3>
      <p
        contenteditable="true"
        @blur="updateProfileField('bio', $event.target?.innerText)"
        class="editable-text"
      >
        {{ profile?.bio || "Enter you bio" }}
      </p>

      <div class="row">
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
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import ProfilePicture from "./ProfilePicture.vue";
import SkillsChips from "./SkillsChips.vue";

// Injecting reactive profile object and update function
const profile = inject("profile");
const updateProfileField = inject("updateProfileField");

</script>

<style scoped>
.column-left {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  text-align: left;
  flex: 1 0 0;
  gap: 2rem;
}

#personal-section {
  width: 28%;
  column-gap: 2.5rem;
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  h1,
  h2 {
    margin: 0;
    white-space: nowrap;
  }

  h2 {
    color: blue;
  }
}

#skills-section {
  h3 {
    color: blue;
  }

  ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    align-self: stretch;
    gap: 0.7rem;

    li {
      display: flex;
      padding: 0.7rem 1.4rem;
      border-radius: 40px;
      justify-content: center;
      border: 1.5px solid var(--Crazy-Blue, #2a45ee);
      background: var(--White, #fff);
    }

    p {
      color: var(--Crazy-Blue, #2a45ee);
      font-size: 1.2rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.36px;
    }
  }
}

#details-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .row {
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
}
</style>
