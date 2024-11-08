<template>
    <div class="header-warning" v-if="requiredFields().length > 0">
        <p>Advarsel</p>
        <p>
            Følgende felt mangler:
            <span v-for="(field, index) in requiredFields()" :key="index">
                {{ field }}{{ index < requiredFields().length - 1 ? ', ' : '' }}
            </span>
        </p>
    </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { ProfileToRender } from '../types';

  const profile = inject<ProfileToRender>('profile');
  
  const requiredFields = () => {
    let warnings:String[] = [];
    
    if (!profile?.name) {
      warnings.push("Navn");
    }
    if (!profile?.jobTitle) {
      warnings.push("Jobbtittel");
    }
    if (!profile?.skills) {
      warnings.push("Ekspertiser");
    }
    if (!profile?.description) {
      warnings.push("Beskrivelse");
    }
    if (!profile?.birthYear) {
      warnings.push("Fødselsår");
    }
    if (!profile?.residence) {
      warnings.push("Bosted");
    }
    if (!profile?.experiences) {
      warnings.push("Erfaringer");
    }
    if (!profile?.qualifications) {
      warnings.push("Kvalifikasjoner");
    }
    
    return warnings;
  };

  const warningsArray = computed(() => requiredFields().length > 0);
  console.log('Child warnings:', warningsArray);

  defineExpose({ warningsArray });
  
</script>

<style scoped>
    .header-warning {
    width: 50rem;
    max-width: 55rem;
    height: 4rem;
    background-color: #e9da05;
    color: #FFF;
    padding: 0.5rem;
    border-radius: 5px;

    p {
      font-size: 1rem;
      color: #000;
    }
  }
</style>