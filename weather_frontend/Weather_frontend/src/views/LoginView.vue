<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <button @click="register">Register</button>
  </div>
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
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
input {
  margin: 8px 0;
  padding: 8px;
  width: 200px;
}
button {
  padding: 8px;
  width: 100px;
  margin: 5px;
}
</style>
