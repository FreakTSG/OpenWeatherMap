<script setup>
import WeatherWidget from '../components/WeatherWidget.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { useCounterStore } from '../stores/counter'; 
import lightModeIcon from '@/assets/sun.png';
import darkModeIcon from '@/assets/moon.png';
const cities = ['lisbon', 'leiria', 'coimbra', 'porto', 'faro'];
const isDarkMode = ref(false);

const router = useRouter(); 
const store = useCounterStore(); 

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value); 
};

const logout = () => {
  store.logout();
  router.push('/login'); 
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
    <button @click="logout" class="logout-button">
      Logout

    </button>
  </div>
</template>
<style scoped>
:root {
  --color-background-light: aliceblue; 
  --color-text-light: aqua; 
  --color-border-light: #ccc; 

  --color-background-dark: #181818; 
  --color-text-dark: #ffffff; 
  --color-border-dark: #444; 
}


.logout-button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}



body {
  background-color: var(--color-background-light); 
  color: var(--color-text-light);
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease; 
}

.dark-mode body {
  background-color: var(--color-background-dark); 
  color: var(--color-text-dark); 
}


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