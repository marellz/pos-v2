<template>
    <div class="rounded-lg bg-slate-100/10 p-4 flex flex-col items-start">
        <div class="mb-8 p-4 rounded-full bg-white text-slate-800 inline-block">
            <component :is="icon" />
        </div>
        <div class="mt-auto">
            <p class="text-slate-400">{{ label }}</p>
            <h1 class="text-4xl font-medium">
                <slot />
            </h1>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { LucideIcon } from 'lucide-vue-next';

defineProps<{
    icon: LucideIcon
    label: string;
}>()
</script>