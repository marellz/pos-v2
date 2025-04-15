import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia'
import type { Item } from '@/data/menu'

export interface OrderItem extends Item {
  quantity: number
}

export interface Order {
  id?: number
  status: string
  items: OrderItem[]
  date: string
}

export const useOrderStore = defineStore(
  'orders',
  () => {
    const sidelinedOrders = ref<Order[]>([])
    const order = ref<Order>()

    const orderTotal = computed(() =>
      order.value?.items.reduce(
        (total, orderItem) => total + orderItem.price * orderItem.quantity,
        0,
      ),
    )

    const addToOrder = (item: Item) => {
      let quantity = order.value?.items.find((i) => i.item === item.item)?.quantity || 0
      editOrder((quantity += 1), item)
    }

    const editOrder = (quan: number, item: Item) => {
      let items = order.value ? [...order.value?.items] : []

      const orderIndex = items.findIndex((_item) => _item.item === item.item)
      const orderExists = orderIndex !== -1

      if (quan && orderExists) {
        items[orderIndex].quantity = quan
      } else if (quan === 0 && orderExists) {
        items.splice(orderIndex, 1)
      } else if (quan && !orderExists) {
        const newItem = { ...item, quantity: quan }
        items = [...items, newItem]
      }

      order.value = order.value
        ? { ...order.value, items }
        : { status: 'new', date: new Date().toISOString(), items }
    }

    return {
      order,
      orderTotal,
      addToOrder,
      editOrder,
    }
  },
  {},
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
