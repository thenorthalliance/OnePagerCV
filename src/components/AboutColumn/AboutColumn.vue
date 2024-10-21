<template>

  <div class="column-left">
    <div id="personal-section">
      <div>
        <ProfilePicture />
      </div>
      <div>
          <h1>{{ profile.firstName }} {{ profile.lastName }}</h1>
          <h2>{{ profile.title }}</h2>
      </div>
  </div>

  <div id="skills-section">
    <h3>Expertise innen</h3>
    <ul>
        <li v-for="skill in profile.skills" :key="skill">
          <p>
            {{ skill }}
          </p>
        </li>
    </ul>
  </div>

  <div id="details-section">
      <h3>Om {{ profile.firstName }}</h3>
      <p>{{ profile.bio }}</p>

      <div class="row">
        <div>
          <span>f. {{ profile.birthYear }}</span>
        </div>
        
        <div>
          <img class="pin-icon" src="./../../assets/icons/pinIcon.svg" alt="Pin icon">
          <span class="residence">{{ profile.placeOfResidence }}</span>
        </div>
        
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import ProfilePicture from './ProfilePicture.vue';
  import { ProfileToRender } from '../../types';
  // Define props to receive the ProfileToRender data
  defineProps<{
    profile: ProfileToRender;
  }>();
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
      border: 1.5px solid var(--Crazy-Blue, #2A45EE);
      background: var(--White, #FFF);
    }

    p{
      color: var(--Crazy-Blue, #2A45EE);
      font-size: 0.8rem;
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

  .pin-icon{
    margin-top:0.1rem;
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

  span{
    color: var(--Black, #323231);
    font-family: NoAAftenScreen;
    font-size: 1rem;
  }
}
</style>
