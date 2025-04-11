<template>
    <button :type class="button">
        <slot />
    </button>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
    type?: 'button' | 'submit'
}>(), {
    type: "button"
})
</script>