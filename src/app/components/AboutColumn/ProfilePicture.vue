<template>
  <div class="profile-picture">
    <div class="frame">
      <img
        v-if="profile?.profilePicture?.src"
        :src="profile.profilePicture.src"
        :style="{ width: `${size}px`, height: `${size}px` }"
        :alt="profile.profilePicture.alt || 'Profile Picture'"
      />
      <div v-else class="placeholder">Upload Photo</div>
      <input type="file" accept="image/*" @change="onImageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { ProfileToRender } from "../../types";

// Accept size as props with default values
defineProps({
  size: {
    type: Number,
    default: 200,
  },
});

// Injecting reactive profile object and update function
const profile = inject<ProfileToRender>("profile");
const updateProfileField = inject<(field: string, value: any) => void>("updateProfileField");

const onImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file && updateProfileField) {
    // Call the updateProfileField function to update profilePicture in the reactive profile
    updateProfileField("profilePicture", {
      src: URL.createObjectURL(file),
      alt: "Profile Picture",
    });
  }
};
</script>

<style scoped>
.profile-picture {
  display: flex;
  justify-content: center;
  align-items: center;
}

.frame {
  width: 200px;
  height: 200px;
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.frame input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  color: #888;
  font-size: 14px;
}

button {
  margin: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
