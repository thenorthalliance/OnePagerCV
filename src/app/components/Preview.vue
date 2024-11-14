<template>
  <div>
    <div class="page-header">
      <h1 class="tool-name">1PCV</h1>
      <div>
        <div v-if="hasWarnings && warningsList.length > 0">
          <HeaderWarning :warnings="warningsList"/>
        </div>
        <div v-else >
          <p class="header-text">
            Fyll inn informasjon hvor det er ønskelig og når "www.noaignite.com" 
            på bunnen av siden forsvinner(når du må skrolle for å se url-adressa) 
            så er det for mye tekst i OnePageren. Etter at du trykker på 
            Export-knappen må du velge at Paper size til "Legal". Deretter tilpasse
            pdf-en slik at den passer til powerpoint-sliden. 
          </p><p class="strong">NB! Fyll ut alle felt for å eksportere pdf-en.</p>
        </div>
      </div>
      <div class="format-selector">
        <!-- <FormatDropdown /> -->
        <button 
          @click="handlePrint" 
          class="export-btn" 
          :disabled="warningsList.length > 0 && hasWarnings" 
        >
          Export
        </button>
      </div>
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

      <!-- This could be it's own component -->
      <div class="footer">
        <p>www.noaignite.com</p>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import { reactive, provide, watch, ref } from 'vue';
import AboutColumn from './AboutColumn/AboutColumn.vue';
import ExperienceColumn from './ExperienceColumn/ExperienceColumn.vue';
import FormatDropdown from './FormatDropdown.vue';
import HeaderWarning from './HeaderWarning.vue';
import { ProfileCMS, ProfileToRender } from '../types';
import { defineQuery } from "next-sanity";
import { client }  from  "../../sanity/client";
import { requiredFields } from '../helpers';
import { OnePagerCvPpt } from '../OnePagerCvPpt';
// import  imageUrlBuilder  from  "@sanity/image-url"
// import { useSanityClient } from 'vue-sanity';
// const  builder = imageUrlBuilder(client);


const toogleWriteToSanity = false;

// Initialize `hasWarnings` as undefined
const hasWarnings = ref<boolean | undefined>(undefined);
const warningsList = ref<string[]>([]); // Track missing fields in real-time


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


let newProfile = reactive<ProfileToRender>({
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


// Watch `profile` to update `hasWarnings` based on required fields
watch(profile, () => {
    warningsList.value = requiredFields(profile);
    hasWarnings.value = warningsList.value.length > 0 ? true : false;
    console.log('Warnings:', hasWarnings.value);
  },
  { deep: true } // Watch deeply to react to changes in nested properties
);

// Function to trigger the print dialog
const handlePrint = () => {
  // warningsList.value = requiredFields(profile); // Refresh warnings on button click
  // if (warningsList.value.length > 0) {
  //   hasWarnings.value = true; // Enable warnings to display the list of missing fields
  // } else {

    // Check if employee already exists in Sanity
    client.fetch(EMPLOYEES_QUERY).then((data) => {
      for (const employee of data) {
        if (employee.name === profile.name) {
          // console.log('Employee already exists in Sanity', employee._id);
          const profileToSanity: ProfileCMS = {...profile, _id: employee._id, _type: 'employee' };

          if(toogleWriteToSanity)
          {
            // Send profile to Sanity
            client.createOrReplace(profileToSanity).then((res) => {
              console.log('Profile sent to Sanity:', res);
            });
          }
          return;

        } else {
          console.log('Employee does not exist in Sanity');
          const profileToSanity: ProfileCMS = {...profile, _id: undefined,  _type: 'employee' };

          if(toogleWriteToSanity)
          {
            client.create(profileToSanity).then((res) => {
              console.log('Profile sent to Sanity:', res);
            });
          }
          return;
        }
      }
    
        
      
    });
    // window.print()
    OnePagerCvPpt(profile);
  // } //end of else to check if there are warnings
 
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
    padding: 0.7rem 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    background: var(--White, #FFF);
    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.25);
    overflow: auto;
    margin-bottom: 5rem;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    width: 1300px;
    padding: 1.5rem 0;
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
    margin: 0 2rem;
  }

  .strong {
    font-family: NoAAftenScreenBold;
    font-size: 1rem;
    color: #fff;
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

  .export-btn {
    height: 2.5rem;
    background-color: #FFF;
    align-self: flex-end;
    color: #303030;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
  }

  .export-btn:disabled {
    background-color: #868686;
    color: #464646;
    font-size: 0.8rem;
    font-weight: 500;
    border-color: #464646;
    cursor: not-allowed;
  }

  .format-selector {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 0.2rem;
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
