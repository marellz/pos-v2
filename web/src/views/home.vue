<template>
  <Container>
    <template v-if="auth.authenticated">
      <h1 class="title">Welcome back, {{ userName }}</h1>

      <h1>Dashboard here</h1>

    </template>
    <template v-else>
      

      <div class="mt-10 flex items-center space-x-4">
        <RouterLink to="/login">
          <button type="button" class="button !bg-transparent !border-transparent">
            <span>Login</span>
          </button>
        </RouterLink>
        <RouterLink to="/register">
          <button type="button" class="button">
            <span>Register</span>
          </button>

        </RouterLink>
      </div>
    </template>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/base/container.vue';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
const auth = useAuthStore()
const userName = computed(() => auth.authenticated ? auth.user?.name.split(' ')[0] : '')

</script>