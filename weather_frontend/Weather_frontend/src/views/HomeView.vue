<script setup>
import WeatherWidget from '../components/WeatherWidget.vue';
import { ref } from 'vue';
import lightModeIcon from '@/assets/sun.png';
import darkModeIcon from '@/assets/moon.png';
const cities = ['lisbon', 'leiria', 'coimbra', 'porto', 'faro'];
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value); // Toggle dark-mode class on the body
};
</script>

<template>
  <div class="app">
    <h1>Weather Dashboard</h1>
    <button @click="toggleDarkMode">
      <img :src="isDarkMode ? lightModeIcon : darkModeIcon" alt="Toggle Dark Mode" />
    </button>
    
    <div class="widgets">
      <WeatherWidget v-for="city in cities" :key="city" :city="city" :is-dark-mode="isDarkMode" />
    </div>
  </div>
</template>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  padding: 16px;
  color: aqua;
  background-color: aliceblue;
  text-align: center;
  box-sizing: border-box;
  width:auto;
}

button {
  margin-top: 10px;
  padding: 8px;
  background-color: transparent; 
  border: white; 
  cursor: pointer;
  transition: transform 0.3s ease;
}

button img {
  width: 30px; 
  height: 30px; 
}

button:hover {
  transform: scale(1.1); 
}

.dark-mode .app {
  background-color: #181818; 
  color: #ffffff; 
}

.dark-mode .app {
  background-color: #181818; 
  color: #ffffff; 
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
</style>