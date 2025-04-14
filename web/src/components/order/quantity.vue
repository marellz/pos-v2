<template>
    <div class="flex items-center space-x-4">
        <button class="p-2 disabled:text-slate-100/10" type="button" @click="model -= 1" :disabled="model <= 0">
            <Minus :size="32" :stroke-width="3" />
        </button>
        <span class="p-2 text-4xl font-medium" :class="{ 'text-slate-100/10': model === 0 }">{{ model }}</span>
        <button class="p-2" type="button" @click="model += 1">
            <Plus :size="32" :stroke-width="3" />
        </button>
    </div>
</template>
<script lang="ts" setup>
import { Minus, Plus } from 'lucide-vue-next';
import { watch } from 'vue';
const model = defineModel<number>({ default: 0 })

const emit = defineEmits(['change'])
watch(model, (v) => {
    emit('change', v)
})
</script>