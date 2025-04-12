import { Beef, Coffee, CookingPot, CupSoda, Salad, Soup, type LucideIcon } from 'lucide-vue-next'

export interface Category {
  label: string
  name: string
  icon: LucideIcon
}

export const categories: Category[] = [
  {
    label: 'Kitchen',
    name: 'Kitchen',
    icon: CookingPot,
  },
  {
    label: 'Accompaniments',
    name: 'accompaniments',
    icon: Soup,
  },
  {
    label: 'Grill',
    name: 'grill',
    icon: Beef,
  },
  {
    label: 'Sides',
    name: 'Sides',
    icon: Salad,
  },
  {
    label: 'Drinks',
    name: 'Drinks',
    icon: CupSoda,
  },
  {
    label: 'Beverages',
    name: 'Beverages',
    icon: Coffee,
  },
]
