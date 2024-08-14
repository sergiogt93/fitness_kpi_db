<script setup lang="ts">
import axios, { setCsrfToken } from '@/axiosInstance'
import GenericListComponent from './GenericListComponent.vue'
import PaginationComponent from './PaginationComponent.vue'
import { Url } from '@/types/Url'
import { Pagination } from '../types/List'

const fetchUrls = async () => {
  try {
    await setCsrfToken()
    const response = await axios.get('/urls')
    return {
      items: response.data.data as Url[],
      pagination: {
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        next_page_url:
          response.data.current_page + 1 < response.data.total ? response.data.current_page + 1 : 0,
        prev_page_url: response.data.current_page - 1
      } as unknown as Pagination
    }
  } catch (e: any) {
    e.value = e.response?.data?.message || 'Login failed'
  }
}
</script>

<template>
  <div>
    <h2 class="title">LISTA DE URLS</h2>
    <div class="btn-actions">
      <button>AÑADIR URL</button>
    </div>
    <GenericListComponent :fetch-data="fetchUrls">
      <template #items="{ items }">
        <div role="ul" class="item" v-for="url in items" :key="url.id">
          {{ url.short_url }}
        </div>
      </template>
      <template #pagination="{ pagination }">
        <pagination-component :pagination="pagination" @change-page="fetchUrls" />
      </template>
    </GenericListComponent>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 10px;
}
.btn-actions {
  display: flex;
  justify-content: end;
  gap: 20px;
}

.btn-actions button,
.item {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #555;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.item {
  margin-top: 15px;
  list-style-type: none;
  padding-left: -15px;
}
</style>
