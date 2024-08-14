<script setup type="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleRegister = () => {
  router.push('/register')
}

const handleLogin = () => {
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <button class="btn" @click="handleRegister">Registrarse</button>
    <button class="btn" @click="handleLogin">Iniciar sesión</button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #333;
  color: white;
}

.navbar button:hover {
  background-color: #777;
}
</style>
