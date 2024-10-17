<template>
  <div>
    <h1>CV Preview</h1>
    <!-- <button @click="printCV">Print CV</button> <!-- Add this print button -->
    <button @click="exportToPDF">Print CV</button>
    <!-- Add this print button -->
    <!-- This is the preview of the CV -->
    <div id="cv-preview" ref="cvPreview">
      <div class="column left">
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

      <div class="column right">
        <div id="experience-section">
          <h3>Utvalgt erfaring</h3>
          <ul>
            <li
              v-for="experience in profile.experiences"
              :key="experience.projectName"
            >
              <h4>
                {{
                  experience.startDate ? formatDate(experience.startDate) : ""
                }}
                -
                {{ experience.endDate ? formatDate(experience.endDate) : "" }}:
                {{ experience.projectName }}
              </h4>
              <p>{{ experience.description }}</p>
            </li>
          </ul>
        </div>

        <div id="qualifications-section">
          <h3>Utdanning, kurs og sertifiseringer</h3>
          <ul>
            <li
              v-for="qualification in profile.qualifications"
              :key="qualification.detail"
            >
              <Strong>{{ qualification.label }}:</Strong>
              <p>{{ qualification.detail }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProfileToRender } from "../types";
import { defineProps } from "vue";
import { formatDate } from "../helpers";
import ProfilePicture from "./ProfilePicture.vue";
import html2pdf from "html2pdf.js";

// Define props to receive the ProfileToRender data
const props = defineProps<{
  profile: ProfileToRender;
}>();

const printCV = () => {
  window.print(); // Trigger the print dialog
};

const exportToPDF = () => {
  const element = document.querySelector("#cv-preview"); // Select the specific component
  const options = {
    margin: 0,
    padding: 0,
    filename: "cv-preview.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a3", orientation: "landscape" },
  };

  html2pdf().from(element).set(options).save(); // Convert the content to PDF and download it
};
</script>

<style scoped>
/* Basic styling for on-screen preview */
#cv-preview {
  /* A4 landscape width */
  width: 297mm;
  /* A4 landscape height */
  height: 200mm;
  margin: 20px auto;
  /* Padding inside the CV */
  padding: 20mm;
  background-color: white;
  font-family: Arial, sans-serif;

  /* For better UX, add a shadow so it looks like a real sheet */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  column-gap: 5mm;
  color: black;
  text-align: start;
  overflow-y: hidden;
}

.column {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.right {
  background-color: aqua;
  padding: 0 1em;
}

#personal-section {
  width: 100%;
  height: 120px;
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

#experience-section {
  ul {
    padding: 0;

    li {
      margin-bottom: 1rem;

      h4 {
        margin: 0;
        font-size: smaller;
      }

      p {
        margin: 0;
        font-size: smaller;
      }
    }
  }
}

#qualifications-section {
  ul {
    padding: 0;

    li {
      margin-bottom: 1rem;
      display: flex;
      column-gap: 0.5em;

      strong {
        font-size: smaller;
      }

      p {
        margin: 0;
        font-size: smaller;
      }
    }
  }
}
</style>
