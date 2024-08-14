import { ref, type Ref } from 'vue';
import type { FormConfig } from '@/types/FormField'
import type { LoginCredentials } from '@/types/User'
import { z } from 'zod';

export const useLoginForm = () => {
  const config: Ref<FormConfig> = ref<FormConfig>({
    fields: [
      {
        type: 'email',
        label: 'Correo Electrónico',
        model: 'email',
        disabled: false
      },
      {
        type: 'password',
        label: 'Contraseña',
        model: 'password',
        disabled: false
      }
    ]
  })

  const models: Ref<LoginCredentials> = ref<LoginCredentials>({
    email: '',
    password: ''
  })

  const schemaValidations = z.object({
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z.string().min(8, "La contraseña debe tener al menos 6 caracteres"),
  });

  return {
    config,
    models,
    schemaValidations
  }
}