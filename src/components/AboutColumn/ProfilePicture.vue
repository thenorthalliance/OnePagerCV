<template>
  <div class="profile-picture">
    <div class="frame" ref="frame">
      <img v-if="imageUrl" :src="imageUrl" :style="{ width: `${size}px`, height: `${size}px` }" ref="image"
        alt="Profile" />
      <div v-else class="placeholder">Upload Photo</div>
      <input type="file" accept="image/*" @change="onImageChange" />
    </div>
    <div v-if="cropper">
      <button @click="rotateImage">Rotate</button>
      <button @click="cropImage">Crop</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

// Accept width and height as props with default values
defineProps({
  size: {
    type: Number,
    default: 120
  }
});

const imageUrl = ref(null);
const image = ref(null);
const cropper = ref(null);

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

onMounted(() => {
  nextTick(() => {
    if (image.value) {
      cropper.value = new Cropper(image.value, {
        aspectRatio: 1,
        viewMode: 1,
      });
    }
  });
});

const rotateImage = () => {
  if (cropper.value) {
    cropper.value.rotate(90);
  }
};

const cropImage = () => {
  if (cropper.value) {
    const canvas = cropper.value.getCroppedCanvas();
    imageUrl.value = canvas.toDataURL();
    cropper.value.destroy(); // Cleanup
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
  width: 120px;
  height: 120px;
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
