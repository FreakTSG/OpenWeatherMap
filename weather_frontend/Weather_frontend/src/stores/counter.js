import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const token = ref(null)

  function increment() {
    count.value++
  }

  function setToken(newToken) {
    token.value = newToken;
  }

  function logout() {
    token.value = null;
  }

  return { count, doubleCount, token, increment, setToken, logout }
})
