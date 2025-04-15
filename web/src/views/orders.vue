<template>
    <Container>
        <div class="">
            <div class="flex items-center">
                <h1 class="text-3xl font-medium">Orders</h1>

                <div class="ml-auto flex items-center space-x-2">
                    <base-button @click="orderStore.generateFakeOrders">
                        <span>Generate</span>
                        <RefreshCcw />
                    </base-button>
                    <base-button>
                        <Calendar />
                        <span>Today, April 14th </span>
                        <ChevronDown />
                    </base-button>
                </div>
            </div>
            <div class="py-10 flex gap-2 flex-wrap">
                <div class="relative">
                    <input class="h-0 w-0 absolute -z-10" type='radio' id="order-all" value="all"
                        v-model="filterStatus" />
                    <label for="order-all">
                        <span
                            class="rounded-full px-4 py-1 font-medium inline-flex items-center space-x-2 bg-white text-slate-800">
                            <span>All</span>
                            <Check v-if="filterStatus === 'all'" :size="16" />
                        </span>
                    </label>
                </div>
                <div v-for="status in orderStatuses" class="relative">
                    <input class="h-0 w-0 absolute -z-10" type="radio" name="order" :id="`order-${status}`"
                        :value="status" v-model="filterStatus">
                    <label :for="`order-${status}`">
                        <span
                            class="rounded-full px-4 py-1 font-medium inline-flex items-center space-x-2 capitalize cursor-pointer select-none"
                            :class="orderStatusColors[status]">
                            <span>
                                {{ status }}
                            </span>
                            <Check v-if="filterStatus === status" :size="16" />
                        </span>
                    </label>

                </div>
            </div>

            <div v-if="orders.length" class="md:columns-2 lg:columns-3 xl:columns-4 gap-10 space-y-4">
                <OrderItem class="break-inside-avoid-column" :order v-for="(order, index) in orders" :key="index"
                    @edit="editOrder(order.id)" @delete="deleteOrder(order.id)" />
            </div>
            <div v-else>
                <div class="bg-slate-100/10 rounded-lg p-8 space-y-1">
                    <h1 class="text-4xl font-medium">Empty</h1>
                    <p class="text-slate-400 text-lg">No orders to show</p>
                </div>
            </div>
        </div>
    </Container>
</template>
<script setup lang="ts">
import Container from '@/components/base/container.vue';
import OrderItem from '@/components/order/card.vue'
import { useOrderStore, type OrderStatus } from '@/stores/order.store';
import { computed, onMounted, ref } from 'vue';
import { orderStatusColors, orderStatuses } from '@/data/order';
import { Calendar, Check, ChevronDown, RefreshCcw } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter()
const orderStore = useOrderStore()
const filterStatus = ref<OrderStatus | 'all'>('all')
const orders = computed(() => orderStore.orders.filter(o => filterStatus.value !== 'all' ? o.status === filterStatus.value : true))

const deleteOrder = async (id: number) => {
    if(!confirm('Are you sure you want to delete this order')) return false

    // hide this button if staff is logged in

    await orderStore.deleteOrder(id)

}

const editOrder = (id: number) => {

    router.push(`/?edit=${id}`)
}


onMounted(() => {
    if (!orderStore.orders.length) orderStore.generateFakeOrders()
})


</script>