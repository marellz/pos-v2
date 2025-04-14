import { Beef, Coffee, CookingPot, CupSoda, Salad, Soup, type LucideIcon } from 'lucide-vue-next'

export interface Category {
  label: string
  name: string
  icon: LucideIcon
  bg: string
}

export const categories: Category[] = [
  {
    label: 'Kitchen',
    name: 'kitchen',
    icon: CookingPot,
    bg: 'bg-color-1 text-slate-800',
  },
  {
    label: 'Accompaniments',
    name: 'accompaniments',
    icon: Soup,
    bg: 'bg-color-5 text-slate-800',
  },
  {
    label: 'Grill',
    name: 'grill',
    icon: Beef,
    bg: 'bg-color-2 text-slate-800',
  },
  {
    label: 'Sides',
    name: 'sides',
    icon: Salad,
    bg: 'bg-color-3 text-slate-800',
  },
  {
    label: 'Drinks',
    name: 'drinks',
    icon: CupSoda,
    bg: 'bg-color-4 text-slate-800',
  },
  {
    label: 'Beverages',
    name: 'beverages',
    icon: Coffee,
    bg: 'bg-color-4 text-slate-800',
  },
]

export interface Item {
  item: string
  category: string
  price: number
}

export const items: Item[] = [
  {
    item: 'Sandwich',
    category: 'kitchen',
    price: 200,
  },
  {
    item: 'Burger',
    category: 'kitchen',
    price: 400,
  },
  {
    item: 'Wrap',
    category: 'kitchen',
    price: 250,
  },
  {
    item: 'Wings',
    category: 'kitchen',
    price: 400,
  },
  {
    item: 'Fried chicken',
    category: 'kitchen',
    price: 150,
  },
  {
    item: 'Skewers',
    category: 'grill',
    price: 150,
  },
  {
    item: 'Roast chicken',
    category: 'grill',
    price: 150,
  },
  {
    item: 'Fries',
    category: 'accompaniments',
    price: 120,
  },
  {
    item: 'Wedges',
    category: 'accompaniments',
    price: 150,
  },
  {
    item: 'Fried rice',
    category: 'accompaniments',
    price: 120,
  },
  {
    item: 'Sauces',
    category: 'sides',
    price: 50,
  },
  {
    item: 'Coleslaw',
    category: 'sides',
    price: 50,
  },
  {
    item: 'Salads',
    category: 'sides',
    price: 50,
  },
  {
    item: 'Soda',
    category: 'drinks',
    price: 80,
  },
  {
    item: 'Juices',
    category: 'drinks',
    price: 100,
  },
  {
    item: 'Water',
    category: 'drinks',
    price: 40,
  },
  {
    item: 'Coffee',
    category: 'beverages',
    price: 40,
  },
  {
    item: 'Tea',
    category: 'beverages',
    price: 40,
  },
]
