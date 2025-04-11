<template>
  <Container>
    <template v-if="auth.authenticated">
      <h1 class="title">Welcome back, {{ auth.userName }}</h1>

      <h1>Menu</h1>

    </template>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/base/container.vue';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
const auth = useAuthStore()

</script>