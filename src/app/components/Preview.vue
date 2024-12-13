<template>
  <div>
    <div class="page-header">
      <h1 class="tool-name">1PCV</h1>

      <div>
        <div v-if="hasWarnings && warningsList.length > 0">
          <HeaderWarning :warnings="warningsList"/>
        </div>
        <div v-else class="header-middle-section" >
          <p class="header-text">
            Fyll inn informasjon. Og når "www.noaignite.com" forsvinner (når du må skrolle for å se noaignite sin url-adresse) 
            så er det for mye tekst i OnePageren. 
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
          Eksporter PowerPoint
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
// import FormatDropdown from './FormatDropdown.vue'; // Can be implemented if the user should be able to select format between PDF and PowerPoint
import HeaderWarning from './HeaderWarning.vue';
import { ProfileCMS, ProfileToRender } from '../types';
import { defineQuery } from "next-sanity";
import { client }  from  "../../sanity/client";
import { requiredFields } from '../helpers';
import { OnePagerCvPpt } from '../OnePagerCvPpt';
// import  imageUrlBuilder  from  "@sanity/image-url"
// import { useSanityClient } from 'vue-sanity';
// const  builder = imageUrlBuilder(client);


const toogleWriteToSanity = true;

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

//// relevant for image handling
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
  },
  { deep: true } // Watch deeply to react to changes in nested properties
);

// Function to trigger the print dialog
const handlePrint = () => {
  warningsList.value = requiredFields(profile); // Refresh warnings on button click

  if (warningsList.value.length > 0) {
    hasWarnings.value = true; // Enable warnings to display the list of missing fields
  } else {// if there are no warnings, proceed to print/powerpoint export
    // Check if employee already exists in Sanity
    client.fetch(EMPLOYEES_QUERY).then((data) => {
      for (const employee of data) {
        if (employee.name === profile.name) {
          const profileToSanity: ProfileCMS = {...profile, _id: employee._id, _type: 'employee' };

          // Toogle-variable to decide if the profile should be updated or created in Sanity
          if(toogleWriteToSanity)
          {
            // Send profile to Sanity
            client.createOrReplace(profileToSanity).then((res) => {
              console.log('Profile sent to Sanity:', res);
            }).catch((err) => {
              console.error('Error updating profile to Sanity:', err);
            });
          }
          return;

        } else { // If employee does not already exist in Sanity
          console.error('Employee does not exist in Sanity');
          const profileToSanity: ProfileCMS = {...profile, _id: undefined,  _type: 'employee' };

          if(toogleWriteToSanity)
          {
            client.create(profileToSanity).then((res) => {
              console.log('Profile sent to Sanity:', res);
            }).catch((err) => {
              console.error('Error sending new profile to Sanity:', err);
            });
          }
          return;
        }
      }
    });

    // The line below is relevant if the option to print becomes relevant
    // window.print()

    // Call the function to generate the PowerPoint
    OnePagerCvPpt(profile);
  } //end of else to check if there are warnings
 
}

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
    max-width: 1200px;
    width: 100%;
    height: 730px;
    aspect-ratio: 16 / 9;
    padding: 0.7rem 1.5rem;
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
    gap: 2.5rem;
  }

  .tool-name {
    font-family: NoAAftenScreenBold;
    color: var(--Black, #323231);
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0 0 0;
  }
  .header {
    align-self: flex-start;
  }

  .header-middle-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header-text {
    color: var(--Black, #323231);
    font-size: 1rem;
  }

  .strong {
    font-family: NoAAftenScreenBold;
    font-size: 1rem;
    color: var(--Black, #323231);
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
    height: 3rem;
    width: 8rem;
    background-color: #FFF;
    border-color: 10px var(--Black, #323231);
    align-self: flex-end;
    color: #303030;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
  }
  .export-btn:hover {
    background-color: var(--Light-Blue, #DDE4FF);
  }
  .export-btn:active {
    color: #FFF;
    border-color: var(--Crazy-Blue, #2A45EE);
    background-color: var(--Crazy-Blue, #2A45EE);
  }

  .export-btn:disabled {
    color: #464646;
    background-color: #868686;
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
