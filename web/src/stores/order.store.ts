import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia'
import type { Item } from '@/data/menu'

export interface OrderItems extends Item {
  quantity: number
}

export const useOrderStore = defineStore(
  'orders',
  () => {
    const order = ref<OrderItems[]>([])

    const orderTotal = computed(() =>
      order.value.reduce((total, item) => (total += item.price * item.quantity), 0),
    )

    const addToOrder = (item: Item) => {
      let quantity = order.value.find((i) => i.item === item.item)?.quantity || 0
      editOrder((quantity += 1), item)
    }

    const editOrder = (quan: number, item: Item) => {
      let o = [...order.value]

      const orderIndex = o.findIndex((o) => o.item === item.item)
      const orderExists = orderIndex !== -1

      if (quan && orderExists) {
        o[orderIndex].quantity = quan
      } else if (quan === 0 && orderExists) {
        o.splice(orderIndex, 1)
      } else if (quan && !orderExists) {
        const newItem = { ...item, quantity: quan }
        o = [...o, newItem]
      }

      order.value = [...o]
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
