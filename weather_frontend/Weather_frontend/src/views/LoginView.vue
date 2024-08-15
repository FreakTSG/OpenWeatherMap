<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-8" max-width="500">
      <v-card-title class="justify-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Username"
            prepend-icon="mdi-account"
            outlined
            required
            class="input-field"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            outlined
            required
            class="input-field"
          ></v-text-field>
          <v-btn class="mt-4" color="primary" type="submit" block>Login</v-btn>
        </v-form>
        <v-btn @click="register" class="mt-4" color="secondary" block>Register</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter';

const username = ref('');
const password = ref('');
const store = useCounterStore();
const router = useRouter();

const login = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    if (!response.ok) {
      const message = await response.json();
      alert(message.error);
      return;
    }

    const data = await response.json();
    store.setToken(data.token);
    router.push('/');
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

const register = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    if (!response.ok) {
      const message = await response.json();
      alert(message.error);
      return;
    }

    alert('User registered successfully');
  } catch (error) {
    console.error('Error registering:', error);
  }
};
</script>

<style scoped>
.v-container {
  min-height: 100vh; 
  min-width: 100vw;  
  background-color: #f0f4f8;
  padding: 16px; 
}


.input-field {
  width: 100%; 
}

.v-card {
  width: 100%;
  max-width: 500px; 
}
</style>
