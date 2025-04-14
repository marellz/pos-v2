<template>
  <div class="flex h-screen min-h-screen bg-dark text-white overflow-auto">
    <nav class="w-64 py-6 px-4">
      <router-link to="/">
        <p class="text-2xl px-4 font-bold">POS V2</p>
      </router-link>
      <ul class="mt-8 space-y-2">
        <li v-for="(link, index) in links" :key="index">
          <router-link :to="link.path" class="block px-4 py-2 rounded-lg hover:bg-slate-100/5"
            exact-active-class="bg-slate-100/10">
            <span class="">
              {{ link.label }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="overflow-auto flex-auto flex flex-col">
      <header></header>
      <main class="flex-auto py-10">
        <Container>
          <RouterView />
        </Container>
      </main>
      <footer></footer>
    </div>
  </div>

</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Container from './components/base/container.vue';
import { useAuthStore } from './stores/auth.store';
import { computed, ref } from 'vue';

const auth = useAuthStore()

const adminLinks = [
  {
    path: "/users",
    label: "Users",
  },
]

const guestLinks = [
  {
    path: "/",
    label: "Menu",
  },
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/orders",
    label: "Orders",
  },
  {
    path: "/sales",
    label: "Sales",
  },

]

const adminMode = ref(false)
const links = computed(() => adminMode.value ? [...guestLinks, ...adminLinks] : guestLinks)

</script>