<template>
    <div>
        <Container>
            <div class="flex items-center justify-between">
                <h1 class="font-medium text-3xl">Dashboard</h1>
                <base-button>
                    <span>
                        12 April, 2023
                    </span>
                    <Calendar />
                </base-button>
            </div>
            <div class="mt-4 grid grid-cols-4 gap-4">
                <DashCard :icon="HandCoins" label="Revenue">
                    <span> 1200</span>
                    <span class="!text-sm">Kes</span>
                </DashCard>
                <DashCard :icon="ReceiptText" label="Paid orders">
                    <span>10</span>
                </DashCard>
                <DashCard :icon="Salad" label="Dishes sold">
                    <span>12</span>
                </DashCard>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-4">
                <base-card>
                    <template #title>
                        <div class="flex items-center justify-between">
                            <h1 class="text-2xl font-medium">
                                Today's upsells
                            </h1>
                            <router-link to="#see-upsells" class="underline hover:text-primary">
                                See all
                            </router-link>
                        </div>
                    </template>
                    <ul class="space-y-4">
                        <li v-for="({ item, count, icon }, index) in formattedUpsales" :key="index">
                            <div class="flex space-x-2">
                                <span class="p-3 rounded bg-slate-100/10">
                                    <component :is="icon" />
                                </span>
                                <div>
                                    <p class="font-medium">
                                        {{ item }}
                                    </p>
                                    <p class="text-sm">
                                        <span class="text-slate-500">Order: </span>
                                        <span>{{ count }}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </base-card>
                <base-card class="col-span-2">
                    <template #title>
                        <div class="flex items-center justify-between">
                            <h1 class="text-2xl font-medium">
                                Accepted orders
                            </h1>
                            <base-button>
                                <span>
                                    Week
                                </span>
                                <ChevronDown />
                            </base-button>
                        </div>
                    </template>
                </base-card>
            </div>
        </Container>
    </div>
</template>
<script setup lang="ts">
import Container from '@/components/base/container.vue';
import DashCard from '@/components/dashboard/card.vue'
import { categories } from '@/data/menu';
import { Calendar, ChevronDown, HandCoins, icons, ReceiptText, Salad, Wine, type LucideIcon } from 'lucide-vue-next';
import { computed } from 'vue';

export interface Upsale {
    item: string;
    category: string;
    count: number
}

const upsales: Upsale[] = [
    {
        item: "Roast chicken",
        category: "grill",
        count: 6,
    },
    {
        item: "Fries",
        category: "accompaniments",
        count: 14,
    },
    {
        item: "Fried rice",
        category: "accompaniments",
        count: 2,
    },
    {
        item: "Wedges",
        category: "accompaniments",
        count: 3,
    },
    {
        item: "Skewers",
        category: "grill",
        count: 7,
    },
]

const formattedUpsales = computed(() => upsales.map(u => {
    return { ...u, icon: categories.find(c => c.name === u.category)?.icon ?? Wine }
}))
</script>