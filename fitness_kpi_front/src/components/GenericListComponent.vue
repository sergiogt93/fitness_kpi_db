<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Pagination } from '@/types/List'

interface Props {
  fetchData: (url?: string) => Promise<{ items: any[]; pagination?: Pagination }>
}

const props = defineProps<Props>()

const items = ref<any[]>([])
const pagination = ref<Pagination | null>(null)

const loadData = async (url: string | null = null) => {
  try {
    const { items: fetchedItems, pagination: fetchedPagination } = await props.fetchData(url || '')
    items.value = fetchedItems
    pagination.value = fetchedPagination || null
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

watch(
  () => props.fetchData,
  () => {
    loadData()
  }
)

onMounted(() => {
  loadData()
})
</script>

<template>
  <div>
    <slot name="items" :items> </slot>
    <slot name="pagination" :pagination> </slot>
  </div>
</template>
<style scoped></style>
