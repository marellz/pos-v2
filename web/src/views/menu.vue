<template>
  <Container>
    <div class="grid lg:grid-cols-3 xl:grid-cols-4 gap-10">
      <div class="space-y-8 lg:col-span-2 xl:col-span-3">
        <Search />
        <h1 class="title">Welcome back, {{ auth.userName || 'Stranger' }}</h1>
        <div class="space-y-4">
          <h2 class="font-medium">Categories</h2>
          <Scrollbar class="flex overflow-auto mr-4 pb-4">
            <MenuCategory v-for="(item, index) in formattedCategories" :key="index" :item v-model="category" />
          </Scrollbar>
        </div>
        <hr>
        <div class="space-y-4">
          <h2 class="font-medium">Menu items</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div v-for="(item, index) in categoryItems" :key="index" class="flex p-4 rounded-lg bg-slate-100/10">
              <div class="flex-auto">
                <h1 class="font-medium text-lg">{{ item.item }}</h1>
                <p class="text-slate-400">
                  Kes. {{ item.price }}</p>
              </div>

              <button class="p-2" type="button" @click="addToOrder(item)">
                <Plus :size="32" :stroke-width="3" />
              </button>
            </div>

          </div>
        </div>
      </div>
      <div class="flex-none space-y-4 flex flex-col">
        <h2 class="font-medium">New order</h2>
        <ul v-if="order.length" class="space-y-4">
          <li v-for="(item, index) in order" :key="index" class="p-4 rounded-lg bg-slate-100/10">
            <div class="">
              <div class="flex items-center space-x-1">
                <div class="w-6 h-6 rounded-full bg-white text-slate-800 font-bold text-center leading-6 text-sm">
                  <span>{{ index + 1 }}</span>
                </div>
                <h1 class="font-medium text-lg">{{ item.item }}</h1>
                <p class="text-slate-400 ml-auto">
                  Kes. {{ item.price }}</p>
              </div>
              <div class="flex justify-end">
                <order-quantity v-model="item.quantity" @change="(e) => editOrder(e, item)"></order-quantity>
              </div>
            </div>
          </li>
        </ul>
        <div v-else>
          <p class="font-medium text-center py-10 bg-slate-100/10 rounded-lg">Order empty</p>
        </div>

        <div class="bg-slate-100/10 p-4 rounded-lg space-y-8 flex-auto flex flex-col">
          <div class="border-b border-dashed border-slate-500 flex items-center justify-between text-xl py-4">
            <p>Order total</p>

            <p class="font-medium">
              <span class="text-slate-400 text-xs">Kes</span> {{ orderTotal }}
            </p>

          </div>
          <div class="space-y-4 mt-auto">
            <p>Payment method</p>

            <div class="flex space-x-4">
              <div v-for="item in paymentMethods" :key="item.key" class="relative">
                <input type="radio" class="h-0 w-0 absolute -z-10" :id="`payment-method-${item.key}`"
                  name="payment-method" :value="item.key" v-model="paymentMethod" />
                <label :for="`payment-method-${item.key}`">
                  <div class="py-4 px-8 rounded-lg text-lg border border-slate-100/10 block"
                    :class="{ '!border-primary text-primary bg-primary/10': paymentMethod === item.key }">
                    <component :is="item.icon" />
                  </div>
                  <p class="text-center text-sm mt-2" :class="{ 'text-primary': paymentMethod === item.key }">
                    {{ item.label }}
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div>
            <base-button class="w-full" :disabled="!order.length">
              <span>Place order</span>
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Scrollbar from '@/components/base/scrollbar.vue';
import OrderQuantity from '@/components/order/quantity.vue'
import Container from '@/components/base/container.vue';
import { categories, items as MenuItems, type Item } from '@/data/menu';
import { useAuthStore } from '@/stores/auth.store';
import { computed, ref } from 'vue';
import { Banknote, Plus, SmartphoneNfc } from 'lucide-vue-next';
import { useOrderStore } from '@/stores/order.store';
import Search from '@/components/form/search.vue';
import MenuCategory from '@/components/menu/category.vue';

const auth = useAuthStore()
const orderStore = useOrderStore()

const { addToOrder, editOrder } = orderStore
const order = computed(() => orderStore.order)
const orderTotal = computed(() => orderStore.orderTotal)

const formattedCategories = computed(() => categories.map(c => {
  return { ...c, count: MenuItems.filter(m => m.category === c.name).length }
}))

const category = ref('kitchen')
const categoryItems = computed(() => category.value !== '' ? MenuItems.filter(m => m.category === category.value) : [])

const paymentMethod = ref('')
const paymentMethods = [
  {
    icon: SmartphoneNfc,
    label: 'M-PESA',
    key: 'm-pesa',
  },
  {
    icon: Banknote,
    label: 'Cash',
    key: 'Cash',
  },
]
</script>asdas