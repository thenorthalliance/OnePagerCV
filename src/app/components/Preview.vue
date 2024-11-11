<template>
  <div>
    <div class="page-header">
      <h1 class="tool-name">1PCV</h1>
      <p class="header-text">
        Fyll inn informasjon hvor det er ønskelig og når "www.noaignite.com" 
        på bunnen av siden forsvinner(når du må skrolle for å se url-adressa) 
        så er det for mye tekst i OnePageren. Etter at du trykker på 
        Export-knappen må du velge at Paper size til "Legal". Deretter tilpasse
        pdf-en slik at den passer til powerpoint-sliden.</p>
      <button @click="handlePrint">Export</button>
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
      <div class="footer">
        <p>www.noaignite.com</p>
      </div>

    </div>
  </div>

  <!-- <div :class="{ 'sticky-line': true, 'hidden-line': hideLine }"></div> -->
  <!-- <div class="sticky-line"></div> -->
</template>

<script setup lang="ts">
import { reactive, provide, watch } from 'vue';
import AboutColumn from './AboutColumn/AboutColumn.vue';
import ExperienceColumn from './ExperienceColumn/ExperienceColumn.vue';
import { ProfileCMS, ProfileToRender } from '../types';

import { defineQuery } from "next-sanity";
import  { client }  from  "../../sanity/client";
// import  imageUrlBuilder  from  "@sanity/image-url"
// import { useSanityClient } from 'vue-sanity';
// const  builder = imageUrlBuilder(client);

const EMPLOYEES_QUERY = defineQuery(`*[
  _type == "employee"
] {
  _id,
  name,
}
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

const newProfile = reactive<ProfileToRender>({
  name: '',
  profilePicture: { src: '', alt: '' },
  birthYear: 0,
  residence: '',
  jobTitle: '',
  skillsTitle: 'Ekspertise innen',
  skills: [],
  descriptionTitle: 'Om Navn',
  description: '',
  experienceTitle: 'Utvalgt erfaring',
  experiences: [
  {
      projectName: '',
      startDate: '',
      endDate: '',
      description: '',
    }, 
    {
      projectName: '',
      startDate: '',
      endDate: '',
      description: '',
    },
    {
      projectName: '',
      startDate: '',
      endDate: '',
      description: '',
    }

  ],
  qualificationTitle: 'Utvalgt erfaring',
  qualifications: [
    { label: '', detail: '' },
    { label: '', detail: '' },
    { label: '', detail: '' },
  ],
});

// Initialize empty profile object
const profile = reactive<ProfileToRender>(newProfile);

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


// Function to trigger the print dialog
const handlePrint = () => {

  client.fetch(EMPLOYEES_QUERY).then((data) => {
    console.log('data', data);

    for (const employee of data) {
      if (employee.name === profile.name) {
        console.log('Employee already exists in Sanity', employee._id);
        const profileToSanity: ProfileCMS = {...profile, _id: employee._id, _type: 'employee' };
        
        console.log('Profile to update:', profileToSanity);
        // Send profile to Sanity
        client.createOrReplace(profileToSanity).then((res) => {
          console.log('Profile sent to Sanity:', res);
        });
        return;

      } else {
        console.log('Employee does not exist in Sanity');
        const profileToSanity: ProfileCMS = {...profile, _id: undefined,  _type: 'employee' };
        console.log('Profile to create:', profileToSanity);
        client.create(profileToSanity).then((res) => {
          console.log('Profile sent to Sanity:', res);
        });

        return;
      }
    }
  
      
    
  });
  
  
  window.print()
}


</script>



<style>
@media print {

  @page {
    margin: 0;
    /* size: legal; */
    /* orientation: landscape; */
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
    /* height: 100%; */
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    background: var(--White, #FFF);
    box-shadow: none;
  }
}

#layout {
    max-width: 1344px;
    width: 100%;
    height: 816px;
    aspect-ratio: 16 / 9;
    padding: 0.7rem 0.1rem; /*TODO: sjekk tall med figma*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    background: var(--White, #FFF);
    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.25);
    overflow: auto;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    padding: 0.5rem;
    gap: 1rem;
  }

  .tool-name {
    font-family: NoAAftenScreenBold;
    color: white;
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0 0 0;
  }

  .header-text {
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    color: white;
    font-size: 1rem;
  }

  .header {
    align-self: flex-start;
  }

  .main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    
    gap: 1.5rem;
    align-self: stretch;
  }

  .footer {
    align-self: center;
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
