<template>
    <div :class="['weather-widget', props.isDarkMode ? 'dark-mode' : '']">
      <h3>{{ cityName }}</h3>
      <div v-if="weather">
        <img :src="weatherIcon" :alt="weather.description" class="weather-icon" />
        <p>
          <strong>Temperature:</strong> {{ (weather.temperature - 273.15).toFixed(1) }}°C
          <strong>Max:</strong> {{ (weather.temperature_max - 273.15).toFixed(1) }}°C
          <strong>Min:</strong> {{ (weather.temperature_min - 273.15).toFixed(1) }}°C
        </p>
        <p>
          <strong>Description:</strong> {{ weather.description }}
        </p>
      </div>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import cloudyImage from '@/assets/cloudy.png';  
  
  const props = defineProps({
    city: {
      type: String,
      required: true,
    },
    isDarkMode: {
    type: Boolean,
    required: true,
  }
  });
  
  const weather = ref(null);
  
  const cityName = computed(() => {
    return props.city.charAt(0).toUpperCase() + props.city.slice(1);
  });
  
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`/api/weather/${props.city}`);
      weather.value = response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  

  const weatherIcon = computed(() => {
    if (!weather.value) return '';
  
    const description = weather.value.description.toLowerCase();
    
    if (description.includes('clear')) return 'https://cdn-icons-png.flaticon.com/512/869/869869.png';
    if (description.includes('broken clouds')) return cloudyImage; 
    if (description.includes('cloud')) return 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png';
    if (description.includes('rain')) return 'https://cdn-icons-png.flaticon.com/512/1146/1146858.png';
    if (description.includes('snow')) return 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png';
    if (description.includes('storm')) return 'https://cdn-icons-png.flaticon.com/512/1146/1146871.png';
    
    return 'https://cdn-icons-png.flaticon.com/512/869/869869.png'; 
  });
  
  onMounted(() => {
    fetchWeather();
    setInterval(fetchWeather, 1800000); 
  });
  </script>
  
  <style scoped>
  .weather-widget {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 8px;
    width: 220px;
    text-align: center;
    color: black;
    border-radius: 8px;
    background-color: skyblue;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .dark-mode {
  background-color: #181818; 
  color: #ffffff; 
}
  
  .weather-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }

  button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

  button:hover {
  background-color: #555;
}
  </style>
  