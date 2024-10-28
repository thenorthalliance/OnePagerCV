<template>
  <div class="column-left">
    <PersonSection />
    <SkillsChips />
    <DetailsSection />

  </div>
</template>

<script setup lang="ts">
import SkillsChips from "./SkillsChips.vue";
import PersonSection from "./PersonSection.vue";
import DetailsSection from "./DetailsSection.vue";

</script>

<style scoped>
.column-left {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  flex: 1 0 0;
  gap: 2rem;
}

</style>
