<template>
    <div class="relative">
        <div class="absolute left-4 top-1/2 -translate-y-1/2">
            <Search />
        </div>
        <input type="text" class="form-input !w-auto" />
    </div>
</template>
<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
</script>