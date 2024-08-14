<template>
  <div class="app">
    <h1>Weather Dashboard</h1>
    <div class="widgets">
      <WeatherWidget v-for="city in cities" :key="city" :city="city" />
    </div>
  </div>
</template>

<script setup>
import WeatherWidget from './components/WeatherWidget.vue';

const cities = ['lisbon', 'leiria', 'coimbra', 'porto', 'faro'];
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #333;
  color: white;
  padding: 16px;
  text-align: center;
  box-sizing: border-box;
  width:auto;
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
