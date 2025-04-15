import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia'
import { items as MenuItems, type Item } from '@/data/menu'
import { faker } from '@faker-js/faker'
import { orderStatuses } from '@/data/order'

export interface OrderItem extends Item {
  quantity: number
}

export type OrderStatus = 'new' | 'pending' | 'preparation' | 'in-delivery' | 'delivered' | 'paid'

export interface Order {
  id: number
  status: OrderStatus
  items: OrderItem[]
  date: string
  total: number
}

export type NewOrder = Omit<Order, 'id' | 'status'> & { id?: number; status?: OrderStatus }

export const useOrderStore = defineStore(
  'orders',
  () => {
    // todo: implement later
    // const sidelinedOrders = ref<Order[]>([])
    const order = ref<NewOrder | Order>()
    const orderTotal = computed(() => (order.value ? _getTotal(order.value?.items) : 0))

    const addToOrder = (item: Item) => {
      let quantity = order.value?.items.find((i) => i.item === item.item)?.quantity || 0
      editOrderItems((quantity += 1), item)
    }

    const createOrder = (_order: NewOrder) => {
      const id = faker.number.int({ min: 200, max: 200 })

      // sent to api and returned
      const newOrder: Order = { id, ..._order, status: 'pending' }

      orders.value = [...orders.value, newOrder]
    }

    const editOrder = (id: number) => {
      const _order = orders.value.find((o) => o.id === id)
      order.value = _order
    }

    const editOrderItems = (quan: number, item: Item) => {
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

      const total = _getTotal(items)

      order.value = order.value
        ? { ...order.value, items, total }
        : { status: 'new', date: new Date().toISOString(), items, total }
    }

    // past orders
    const orders = ref<Order[]>([])

    const updateOrder = (id: number) => {
      const _existing = orders.value.findIndex((o) => o.id === id)
      if (_existing === -1) throw new Error('Order not existing')
      if(!order.value) throw new Error('Order is invalid')

      order.value.status = 'pending'

      // after update order on api
      let o = [...orders.value]
      o[_existing] = order.value as Order
      orders.value = [...o]

      order.value = undefined
    }

    const deleteOrder = async (id: number) => {
      const o = [...orders.value].filter((_order) => _order.id !== id)
      orders.value = [...o]
    }

    const _getTotal = (items: OrderItem[]) => {
      return items.reduce((total, orderItem) => total + orderItem.price * orderItem.quantity, 0)
    }

    const generateFakeOrders = (count: number = 25) => {
      console.log('Creating a batch of fake orders')
      orders.value = []
      const _statuses = [...orderStatuses]
      _statuses.splice(_statuses.indexOf('new'), 1)
      for (let index = 0; index < count; index++) {
        const items = faker.helpers
          .arrayElements(MenuItems, { min: 2, max: 6 })
          .map((i) => ({ ...i, quantity: faker.number.int({ min: 1, max: 2 }) }))
        const total = _getTotal(items)
        const order = {
          id: 100 + index,
          status: faker.helpers.arrayElement(_statuses),
          date: faker.date.between({ from: '01-04-2025', to: new Date() }).toDateString(),
          items,
          total,
        }

        orders.value = [...orders.value, order]
      }
    }

    return {
      order,
      orders,
      orderTotal,
      addToOrder,
      editOrder,
      editOrderItems,
      deleteOrder,
      createOrder,
      updateOrder,

      _getTotal,

      // temporary
      generateFakeOrders,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['orders', 'order'],
    },
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
