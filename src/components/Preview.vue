<template>
  <div>
    <div class="page-header">
      <h1 class="tool-name">CV1P</h1>
      <button @click="exportToPDF">Print CV</button>
    </div>

    <!-- This is the preview of the CV -->
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
</template>

<script setup lang="ts">
import { reactive, provide, watch } from 'vue';
import AboutColumn from './AboutColumn/AboutColumn.vue';
import ExperienceColumn from './ExperienceColumn/ExperienceColumn.vue';
import { ProfileToRender } from '../types';
import html2pdf from 'html2pdf.js';

// Initialize empty profile object
const profile = reactive<ProfileToRender>({
  firstName: '',
  lastName: '',
  profilePicture: { src: '', alt: '' },
  birthYear: undefined,
  placeOfResidence: '',
  title: '',
  skills: [],
  bio: '',
  experiences: [],
  qualifications: [],
});

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

const exportToPDF = () => {
  const element = document.querySelector("#layout"); // Select the specific component 
  const options = {
    margin: 0,
    padding: 0,
    filename: "cv-preview.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
  };

  html2pdf().from(element).set(options).save(); // Convert the content to PDF and download it
};
</script>



<style>
#layout {
  width: 80vw;
  max-width: 1220px;
  height: auto;
  aspect-ratio: 16 / 9;
  padding: 1rem 1.5rem;
  /**TODO: sjekk tall med figma */
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  align-self: stretch;
}
</style>
