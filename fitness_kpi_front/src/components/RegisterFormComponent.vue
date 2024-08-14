<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import GenericFormComponent from '@/components/GenericFormComponent.vue'
import { useRegisterForm } from '@/composables/useRegisterForm'
import type { RegisterCredentials } from '@/types/User'

const registerForm = useRegisterForm()
const authStore = useAuthStore()

const handleFormSave = async (formData: RegisterCredentials) => {
  await authStore.register(formData)
}
</script>

<template>
  <div class="registerForm">
    <GenericFormComponent
      title="Registro"
      :config="registerForm.config.value"
      :modelValue="registerForm.models.value"
      :schemaValidation="registerForm.schemaValidations"
      @form:save="handleFormSave"
    >
      <template #buttonSubmit="{ handleSubmit }">
        <button class="btnSubmit" type="submit" @submit="handleSubmit">ENVIAR</button>
      </template>
    </GenericFormComponent>
  </div>
</template>

<style scoped>
.registerForm {
  margin-top: 40px;
}
</style>
