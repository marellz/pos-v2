<template>
    <span class="rounded-full px-2 py-0.5 text-sm font-medium shadow" :class="orderStatusColors[status]">{{
        status }}</span>
</template>
<script lang="ts" setup>
import { orderStatusColors } from '@/data/order';
import type { OrderStatus } from '@/stores/order.store';

defineProps<{
    status: OrderStatus
}>()
</script>