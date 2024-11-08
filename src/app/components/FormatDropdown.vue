<template>
    <div class="format-dropdown">
        <label class="dropdown-label" for="format">Format: </label>
        <div class="dropdown">
        <select name="format" id="format">
            <option value="a3">A3</option>
            <option value="a4">A4</option>
        </select>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .dropdown-label {
        color: #FFF;
        margin-right: 1rem;
        font-family: NoAAftenScreen;
        font-size: 1.3rem;
        align-self: center;
    }
    .format-dropdown {
        display: flex;
        align-self: flex-end;
    }

    .dropdown {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    select {
        height: 2.5rem;
        width: 5rem;
        background-color: #fff;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        color: black
    }
</style>
