<template>
    <div class="rounded-lg p-4 bg-slate-100/10 space-y-4">
        <div class="border-b border-b-slate-100/10 pb-2 flex items-center justify-between">
            <h1 class="text-xl font-medium">
                <span class="text-slate-400">
                    Order
                </span>
                #{{ order.id }}
            </h1>

            <OrderStatus :status="order.status"></OrderStatus>
        </div>

        <table class="w-full">
            <thead>
                <tr>
                    <th class="font-normal text-left text-xs text-slate-400 pb-2">QT</th>
                    <th class="font-normal text-left text-xs text-slate-400 pb-2">Item</th>
                    <th class="font-normal text-left text-xs text-slate-400 pb-2" width="70px">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr class="group" v-for="(item, index) in order.items" :key="index">
                    <td class="py-0.5" :class="{ 'pb-4': index === (order.items.length - 1) }">
                        <p>
                            {{ item.quantity }}
                        </p>
                    </td>
                    <td class="py-0.5" :class="{ 'pb-4': index === (order.items.length - 1) }">
                        <p>
                            {{ item.item }}
                        </p>
                    </td>
                    <td class="py-0.5" :class="{ 'pb-4': index === (order.items.length - 1) }">
                        <p>
                            <span class="text-xs text-slate-400">Kes.</span> {{ item.price }}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="border-t border-slate-100/10 pt-4">
                        <p class="text-xs text-slate-400">Total</p>
                    </td>
                    <td class="border-t border-slate-100/10 pt-2">
                        <p>
                            <span class="text-xs text-slate-400">Kes.</span>
                            {{ order.total }}

                        </p>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4 flex items-center space-x-2">
            <button v-if="canEdit" type="button" class="p-1 border border-slate-100/10 rounded hover:bg-slate-100/10"
                @click="$emit('edit')">
                <Edit :stroke-width="1.5" />
            </button>
            <button type="button"
                class="py-1.5 px-2 border border-slate-100/10 rounded hover:bg-primary/10 hover:border-primary-2 text-sm font-medium">
                <span>Payment</span>
            </button>
        </div>


    </div>
</template>
<script lang="ts" setup>
import OrderStatus from '@/components/order/status.vue'
import type { Order } from '@/stores/order.store';
import { Edit } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{ order: Order }>()
defineEmits(['edit'])

const canEdit = computed(() => ['new', 'preparation', 'pending'].includes(props.order.status))
</script>