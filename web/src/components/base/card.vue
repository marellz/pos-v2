<template>
    <div class="p-4 rounded-lg border border-slate-500">
        <slot name="title">
            <div v-if="title">
                <h1 class="text-2xl font-medium">{{ title }}</h1>
            </div>
        </slot>
        <div :class="{ 'mt-4': title !== null }">
            <slot />
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    title?: string;
}>()
</script>