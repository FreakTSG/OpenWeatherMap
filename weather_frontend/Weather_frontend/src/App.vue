<template>
  <router-view />
</template>

<script setup>

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
  
  text-align: center;

  width:auto;
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

button {
  margin-top: 10px;
  padding: 8px;
  background-color: transparent; 
  border: none; 
  cursor: pointer;
  transition: transform 0.3s ease;
}

button img {
  width: 30px; 
  height: 30px; 
}
</style>
