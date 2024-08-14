<script setup lang="ts">
import { Pagination } from '@/types/List'

interface Props {
  pagination: Pagination | null
}

defineProps<Props>()
</script>

<template>
  <div class="pagination">
    <button
      @click="$emit('change-page', pagination?.prev_page_url)"
      :disabled="!pagination?.prev_page_url"
      class="btn"
    >
      Anterior
    </button>
    <span>Página {{ pagination?.current_page }} de {{ pagination?.last_page }}</span>
    <button
      @click="$emit('change-page', pagination?.next_page_url)"
      :disabled="!pagination?.next_page_url"
      class="btn"
    >
      Siguiente
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
