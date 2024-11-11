<template>
    <div class="header-warning" v-if="warnings.length > 0">
        <p>Advarsel</p>
        <p>
            Følgende felt mangler urfylling:
            <span v-for="(field, index) in warnings" :key="index">
                {{ field }}{{ index < warnings.length - 1 ? ', ' : '' }}
            </span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
    warnings: string[],
}>();
  
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