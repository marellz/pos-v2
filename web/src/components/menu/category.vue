<template>
    <div class="relative flex-none w-48">
        <input type="radio" class="h-0 w-0 absolute -z-10" v-model="model" :value="item.name"
            :id="`category-${item.name}`" name="category" />
        <label :for="`category-${item.name}`">
            <div class="rounded-xl p-1 border-2 border-transparent"
                :class="{ '!border-primary': item.name === model }">
                <div class="p-4 rounded-lg" :class="[item.bg]">
                    <span class="p-3 rounded-full bg-white text-slate-800 inline-block">
                        <component :is="item.icon" />
                    </span>
                    <h2 class="font-medium mt-4">
                        {{ item.label }}
                    </h2>
                    <p class="text-xs text-slate-500">
                        {{ item.count }} items
                    </p>
                </div>
            </div>
        </label>
    </div>
</template>
<script lang="ts" setup>
import type { Category } from '@/data/menu';

defineProps<{
    item: Category & { count: number }
}>()

const model = defineModel<string>({ default: "kitchen" })

</script>