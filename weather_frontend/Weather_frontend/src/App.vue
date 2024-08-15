<template>
  <div class="app">
    <h1>Weather Dashboard</h1>
    <button @click="toggleDarkMode">
      <img :src="isDarkMode ? lightModeIcon : darkModeIcon" alt="Toggle Dark Mode" />
    </button>
    <div class="widgets">
      <WeatherWidget v-for="city in cities" :key="city" :city="city" :is-dark-mode="isDarkMode"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WeatherWidget from './components/WeatherWidget.vue';

import lightModeIcon from '@/assets/sun.png';
import darkModeIcon from '@/assets/moon.png';

const cities = ['lisbon', 'leiria', 'coimbra', 'porto', 'faro'];
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: whitesmoke;
  color: black;
  padding: 16px;
  text-align: center;
  box-sizing: border-box;
  width:auto;
}

.dark-mode .app {
  background-color: #181818; /* Background color for dark mode */
  color: #ffffff; /* Text color for dark mode */
}

.widgets {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
}

.widgets > .weather-widget {
  flex: 1 1 250px;
  max-width: 300px;
}


@media (max-width: 799px) {
  .widgets {
    flex-direction: column;
    align-items: center;
  }

  .widgets > .weather-widget {
    width: 100%;
    max-width: 300px;
  }
}

button {
  margin-top: 10px;
  padding: 8px;
  background-color: transparent; /* Transparent background */
  border: none; /* Remove default border */
  cursor: pointer;
  transition: transform 0.3s ease;
}

button img {
  width: 30px; /* Set the width of the icon */
  height: 30px; /* Set the height of the icon */
}
</style>
