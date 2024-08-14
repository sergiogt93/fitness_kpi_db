<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { LoginCredentials } from '@/types/User'
import GenericFormComponent from './GenericFormComponent.vue'
import { useLoginForm } from '@/composables/useLoginForm'

const loginForm = useLoginForm()
const authStore = useAuthStore()

const handleFormSave = async (formData: LoginCredentials) => {
  await authStore.login(formData)
}
</script>

<template>
  <div class="loginForm">
    <GenericFormComponent
      title="Iniciar Sessión"
      :config="loginForm.config.value"
      :modelValue="loginForm.models.value"
      :schemaValidation="loginForm.schemaValidations"
      @form:save="handleFormSave"
    >
      <template #buttonSubmit="{ handleSubmit }">
        <button class="btnSubmit" type="submit" @submit="handleSubmit">ENVIAR</button>
      </template>
    </GenericFormComponent>
  </div>
</template>

<style scoped>
.loginForm {
  margin-top: 40px;
}
</style>
