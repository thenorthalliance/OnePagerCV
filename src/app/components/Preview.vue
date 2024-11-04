<template>
  <div>
    <div class="page-header">
      <h1 class="tool-name">CV1P</h1>
      <!-- <button @click="exportToPDF">Print CV</button> -->
      <button @click="handlePrint">Print CV</button>
    </div>

    <!-- Content to be printet -->
    <div id="layout" ref="cvPreview">

      <div class="header">
        <p>NoA Ignite konsulentprofil</p>
      </div>

      <div class="main">
        <AboutColumn />
        <ExperienceColumn />
      </div>

      <!-- Dette kan sikkert også bli en komponent, mangler sidetall nå -->
      <div>
        <p>www.noaignite.com</p>
      </div>

    </div>
  </div>

  <!-- <div :class="{ 'sticky-line': true, 'hidden-line': hideLine }"></div> -->
  <div class="sticky-line"></div>
</template>

<script setup lang="ts">
import { reactive, provide, watch } from 'vue';
import AboutColumn from './AboutColumn/AboutColumn.vue';
import ExperienceColumn from './ExperienceColumn/ExperienceColumn.vue';
import { ProfileToRender } from '../types';

import { defineQuery } from "next-sanity";
import  { client }  from  "../../sanity/client";
// import  imageUrlBuilder  from  "@sanity/image-url"
// import { useSanityClient } from 'vue-sanity';
// const  builder = imageUrlBuilder(client);

// Function to trigger the print dialog
const handlePrint = () => {
  window.print()
}

const EMPLOYEES_QUERY = defineQuery(`*[
  _type == "employee"
]
// {
//   firstname,
//   lastname,
//   image,
//   birthYear,
//   residence,
//   jobTitle,
//   skills,
//   description,
//   experience,
//   qualifications
// }
`);


// const { projectId, dataset } = client.config();
// const urlFor = ( source: SanityImageSource) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null; 

    
//TODO: make red-dotted line disapear when height is reached 
// import { ref, onMounted, onUnmounted } from "vue";

// const hideLine = ref(false);
// const cvPreview = ref<HTMLElement | null>(null);

// function checkLineVisibility() {
//   if (cvPreview.value) {
//     const rect = cvPreview.value.getBoundingClientRect();
//     // Set height threshold where the line should disappear, adjust 200 to desired value
//     hideLine.value = rect.top < 1570;
//   }
// }

// // Listen to scroll events
// onMounted(() => {
//   window.addEventListener("scroll", checkLineVisibility);
//   checkLineVisibility(); // Initial check
// });

// onUnmounted(() => {
//   window.removeEventListener("scroll", checkLineVisibility);
// });

const dummyProfile = {
  firstname: 'Christian M',
  lastname: 'Sinding-Larsen',
  profilePicture: { src: 'https://via.placeholder.com/100', alt: 'Magnus Oma' },
  birthYear: 1990,
  placeOfResidence: 'Oslo',
  title: 'Team Lead Customer Experience & Advisor',
  skillsTitle: 'Ekspertise innen',
  skills: ['JavaScript', 'Vue.js', 'TypeScript', 'Vue.js', 'TypeScript', 'Vue.js', 'TypeScript', 'Vue.js', 'TypeScript', 'Vue.js'],
  description: 'Ole er en av NoA Ignites mest erfarne UX-designere og han har lang erfaring med interaksjonsdesign, designsystem, konseptutvikling, prototyping, innsiktsarbeid og grafisk design. Han er kreativ, løsningsorientert og er en god lagspiller. I 2023 fikk han sammen med prosjektgruppen DOGA-merket for løsningen «Videosamtale med AMK».',
  experienceTitle: 'Utvalgt erfaring',
  experiences: [
    {
      projectName: 'Avonova Web',
      startDate: new Date('2022-09-01'),
      endDate: new Date('2024-04-01'),
      description: 'Magnus har jobbet på flere prosjekter for Avonova, hvor han først bidro som utvikler og senere som tech lead. Prosjektene inkluderte fornyelse av Avonovas nettsider for å sikre en ... Magnus tok ansvar for vedlikehold og videreutvikling av pipeline-ene i Azure DevOps, samt optimalisering av trafikkflyten med Azure Frontdoor. Som tech lead sikret han balansen mellom tekniske og forretningsmessige mål, og håndterte teknisk gjeld for å sikre langsiktig skalerbarhet.',
    }, {
      projectName: 'Avonova Web',
      startDate: new Date('2022-09-01'),
      endDate: new Date('2024-04-01'),
      description: 'Magnus har jobbet på flere prosjekter for Avonova, hvor han først bidro som utvikler og senere som tech lead. Prosjektene inkluderte fornyelse av Avonovas nettsider for å sikre en enhetlig identitet på tvers av land, samt en kursbookingsløsning som integrerte data fra flere systemer via et Next.js API.',
    },
  ],
  qualificationTitle: 'Utdanning, kurs og sertifiseringer',
  qualifications: [
    { label: 'Bachelor of Science', detail: 'Information Technology' },
    { label: 'Kurs', detail: 'Sanity certified developer' },
    { label: 'Kurs', detail: 'Fart og flyt, FINN' },
  ],
};

// Initialize empty profile object
const profile = reactive<ProfileToRender>(dummyProfile);

// Generic function to update any field in the profile
const updateProfileField = (field: keyof ProfileToRender, value: any) => {
  profile[field] = value;
};

// Provide the profile and the update function to all child components
provide('profile', profile);
provide('updateProfileField', updateProfileField);

// Console log profile on change to comfirm that updates are working
watch(profile, () => {
  console.log('Profile updated:', profile);
}, { deep: true });


// Send profile to Sanity
const profileToSanity = {
  _type: 'employee',
  _id: 'f6f84924-8f66-48f9-aa88-0b4cec377825',
  firstname: profile?.firstname,
  lastname: profile?.lastname,
  // image: {
  //   _type: 'image',
  //   asset: {
  //     _ref: profile?.profilePicture?.src,
  //     _type: 'reference',
  //   },
  // },
  birthYear: profile?.birthYear,
  residence: profile?.placeOfResidence,
  jobTitle: profile?.title,
  skills: profile?.skills,
  description: profile?.description,
  experience: profile?.experiences,
  qualifications: profile?.qualifications,
};

// console.log('Profile: ', JSON.stringify(profile, null, 2));

client.createOrReplace(profileToSanity).then((res) => {
  // console.log('Profile: ', profileToSanity);
  console.log('Profile sent to Sanity:', res);
});

client.fetch(EMPLOYEES_QUERY).then((data) => {
  console.log('data', data);
});

</script>



<style>
@media print {

  @page {
    margin: 0;
  }

  #app {
    margin: 0;
  }

  body * {
    visibility: hidden;
  }

  #layout, #layout * {
    visibility: visible;
  }

  #layout {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    /* max-height: auto; */
    /* min-height: 1344px;*/
    /* aspect-ratio: 16 / 9; */
    /* padding: 1rem 1.5rem; *TODO: sjekk tall med figma */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background: var(--White, #FFF);
    /* box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.25); */
  }
}

#layout {
    width: 1920px;
    /* max-height: auto; */
    /* min-height: 1344px;*/
    aspect-ratio: 16 / 9;
    padding: 1rem 1.5rem; /*TODO: sjekk tall med figma */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background: var(--White, #FFF);
    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.25);
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    padding: 0.5rem;
  }

  .tool-name {
    font-family: NoAAftenScreenBold;
    color: white;
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0 0 0;
  }

  .header {
    align-self: flex-start;
  }

  .main {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 1.5rem;
    align-self: stretch;
  }

  .sticky-line {
    position: absolute;
    top: 1471px;
    width: 1920px;
    z-index: 1000;
    border: 5px dashed red;
  }
  .hidden-line {
    display: none;
  }
</style>
