<script setup lang="ts">
import type { FormConfig, FormErrors } from '@/types/FormField'
import { ref, watch } from 'vue'
import type { ZodSchema } from 'zod'

interface Props {
  title?: string
  config: FormConfig
  modelValue: Record<string, any>
  schemaValidation?: ZodSchema
}

const props = defineProps<Props>()

const emit = defineEmits(['form:value-updated', 'form:save', 'form:validation-errors'])

const formData = ref({ ...props.modelValue })
const formErrors = ref<FormErrors>({})

const handleInputChange = (model: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.type === 'checkbox' ? target.checked : target.value
  formData.value = { ...formData.value, [model]: value }
  emit('form:value-updated', { model, value })
}

const handleSubmit = () => {
  if (props.schemaValidation) {
    const result = props.schemaValidation.safeParse(formData.value)
    console.log('result', result)
    if (!result.success) {
      console.log('Failed to validate', result.error.format())
      formErrors.value = result.error.format() as unknown as FormErrors
      emit('form:validation-errors', formErrors.value)
      return
    }
  }
  emit('form:save', { ...formData.value })
}

watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = { ...newValue }
  },
  { deep: true }
)
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <slot name="title" v-if="title" :title="title">
      <h2 class="title">{{ title }}</h2>
    </slot>
    <div v-for="field in config.fields" :key="field.model" class="form-field">
      <slot name="label" :field>
        <label :for="field.model">{{ field.label }}</label>
      </slot>

      <slot name="inputText" :field :model="formData[field.model]">
        <input
          v-if="
            field.type === 'text' ||
            field.type === 'email' ||
            field.type === 'number' ||
            field.type === 'password'
          "
          :type="field.type"
          :id="field.model"
          v-model="formData[field.model]"
          :disabled="field.disabled"
          @input="handleInputChange(field.model, $event)"
        />
      </slot>

      <slot name="select" :field :model="formData[field.model]">
        <select
          v-if="field.type === 'select'"
          :id="field.model"
          v-model="formData[field.model]"
          :disabled="field.disabled"
        >
          <slot name="selectOption" :options="field.options">
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </slot>
        </select>
      </slot>

      <slot name="inputCheckbox" :field :model="formData[field.model]">
        <input
          v-if="field.type === 'checkbox'"
          type="checkbox"
          :id="field.model"
          v-model="formData[field.model]"
          :disabled="field.disabled"
          @input="handleInputChange(field.model, $event)"
        />
      </slot>

      <slot name="errors" :field="field" :error="formErrors[field.model]">
        <div v-if="formErrors[field.model]" class="box-message">
          <div v-for="(error, key) in formErrors[field.model]._errors" :key="key">
            <p>{{ error }}</p>
          </div>
        </div>
      </slot>
    </div>

    <slot name="buttonSubmit" :handleSubmit="handleSubmit">
      <button type="submit" @submit.prevent="handleSubmit">Submit</button>
    </slot>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  place-items: center;
  flex-flow: column;
  gap: 20px;
  background-color: #333;
  padding: 15px 0px;
}

.form-field {
  display: flex;
  place-items: center;
  flex-flow: column;
}

.form-field input {
  border: 4px solid #777;
  background-color: #777;
  border-radius: 4px;
}

.box-message {
  color: rgb(127, 14, 14);
  font-weight: bolder;
  background-color: rgb(224, 142, 142);
  font-size: 0.875rem;
  display: flex;
  flex-flow: column;
  gap: 5px;
  padding: 5px;
  margin-top: 5px;
}
</style>
