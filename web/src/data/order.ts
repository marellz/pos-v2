import type { OrderStatus } from '@/stores/order.store'

export const orderStatuses: OrderStatus[] = [
  'new',
  'pending',
  'preparation',
  'in-delivery',
  'delivered',
  'paid',
]

export const orderStatusColors : Record<OrderStatus, string> = {
  new: 'bg-slate-400',
  pending: 'bg-orange-500', 
  preparation: 'bg-teal-500',
  'in-delivery': 'bg-orange-500', 
  delivered: 'bg-teal-900',
  paid: 'bg-green-500',
}
