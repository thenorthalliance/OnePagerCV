<template>

    <div class="column-left">
            <div id="personal-section">
            <img src="https://via.placeholder.com/100" alt="Profile Picture" class="profile-pic" />
            <div>
                <h1>{{ profile.firstName }} {{ profile.lastName }}</h1>
                <h2>{{ profile.title }}</h2>
            </div>
            </div>

            <div id="skills-section">
            <h2>Expertise innen</h2>
            <ul>
                <li v-for="skill in profile.skills" :key="skill">{{ skill }}</li>
            </ul>
            </div>

            <div id="about-section">
            <h2>Om {{ profile.firstName }}</h2>
            <p>{{ profile.bio }}</p>
            <div>
                <span>f. {{ profile.birthYear }}</span>
                <span>{{ profile.placeOfResidence }}</span>
            </div>
            </div>
        </div>

</template>

<script setup lang="ts">

import { ProfileToRender } from '../../types';
// Define props to receive the ProfileToRender data
defineProps<{
  profile: ProfileToRender;
}>();
</script>

<style scoped>
.column-left {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#personal-section {
  width: 100%;
  height: 120px;
  background-color: #f0f0f0;
  margin-top: 10mm;
  display: flex;
  column-gap: 10mm;

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
  height: 140px;

  h2 {
    color: blue;
    font-size: smaller;
  }

  ul {
    padding: 0;
    display: flex;
    gap: 2mm;
    flex-wrap: wrap;

    li {
      padding: 0.5em 1em;
      border: 1px solid blue;
      border-radius: 25px;
      font-size: small;
    }
  }
}

#about-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  h2 {
    color: blue;
    font-size: smaller;
  }

  p {
    margin: 0;
  }

  div {
    margin-top: auto;
    display: flex;
    column-gap: 1rem;
    color: gray;
    font-size: smaller;
  }
}
</style>
