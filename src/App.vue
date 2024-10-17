<script setup lang="ts">
import Preview from './components/Preview.vue';
import { ProfileToRender } from './types';

// Define a dummy ProfileToRender object
const profileToRender: ProfileToRender = {
  firstName: 'ole',
  lastName: 'Oma',
  profilePicture: { src: 'https://via.placeholder.com/100', alt: 'Magnus Oma' },
  birthYear: 1990,
  placeOfResidence: 'Oslo, Norway',
  title: 'Utvikler',
  skills: ['JavaScript', 'Vue.js', 'TypeScript', 'Vue.js', 'TypeScript', 'Vue.js', 'TypeScript', 'Vue.js', 'TypeScript', 'Vue.js'],
  bio: 'Experienced developer in JavaScript and Vue.js.',
  experiences: [
    {
      projectName: 'Avonova Web',
      startDate: new Date('2022-09-01'),
      endDate: new Date('2024-04-01'),
      description: 'Magnus har jobbet på flere prosjekter for Avonova, hvor han først bidro som utvikler og senere som tech lead. Prosjektene inkluderte fornyelse av Avonovas nettsider for å sikre en enhetlig identitet på tvers av land, utvikling av bransjespesifikke sider med Next.js dynamic routes, samt en kursbookingsløsning som integrerte data fra flere systemer via et Next.js API. Magnus tok ansvar for vedlikehold og videreutvikling av pipeline-ene i Azure DevOps, samt optimalisering av trafikkflyten med Azure Frontdoor. Som tech lead sikret han balansen mellom tekniske og forretningsmessige mål, og håndterte teknisk gjeld for å sikre langsiktig skalerbarhet.',
    }, {
      projectName: 'Avonova Web',
      startDate: new Date('2022-09-01'),
      endDate: new Date('2024-04-01'),
      description: 'Magnus har jobbet på flere prosjekter for Avonova, hvor han først bidro som utvikler og senere som tech lead. Prosjektene inkluderte fornyelse av Avonovas nettsider for å sikre en enhetlig identitet på tvers av land, utvikling av bransjespesifikke sider med Next.js dynamic routes, samt en kursbookingsløsning som integrerte data fra flere systemer via et Next.js API.',
    },
  ],
  qualifications: [
    { label: 'Bachelor of Science', detail: 'Information Technology' },
    { label: 'Kurs', detail: 'Sanity certified developer' },
    { label: 'Kurs', detail: 'Fart og flyt, FINN' },
  ],
};
</script>

<template>
  <Preview :profile="profileToRender" />
</template>

<style scoped>
</style>
