<script setup lang="ts">
import GenericFormComponent from '@/components/GenericFormComponent.vue'
import { useUrlForm } from '@/composables/useUrlForm'
import type { UrlPost } from '@/types/Url'

const urlForm = useUrlForm()

const handleFormSave = async (formData: UrlPost) => {}
</script>

<template>
  <div class="urlForm">
    <div class="box">
      <button class="btn" type="button" @click="$router.push('/dashboard')">
        VER LISTADO DE URLS
      </button>
    </div>
    <GenericFormComponent
      title="ACORTAR URL"
      :config="urlForm.config.value"
      :modelValue="urlForm.models.value"
      :schemaValidation="urlForm.schemaValidations"
      @form:save="handleFormSave"
    >
      <template #buttonSubmit="{ handleSubmit }">
        <button class="btnSubmit" type="submit" @submit="handleSubmit">ENVIAR</button>
      </template>
    </GenericFormComponent>
  </div>
</template>

<style scoped>
.box {
  margin-bottom: 15px;
  display: flex;
  justify-content: end;
}

.urlForm {
  margin-top: 40px;
}
</style>
