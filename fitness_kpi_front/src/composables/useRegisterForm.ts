import { ref, type Ref } from 'vue';
import type { FormConfig } from '@/types/FormField'
import type { RegisterCredentials } from '@/types/User'
import { z } from 'zod';

export const useRegisterForm = () => {
  const config: Ref<FormConfig> = ref<FormConfig>({
    fields: [
      { type: 'text', label: 'Nombre', model: 'name', disabled: false },
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
      },
      {
        type: 'password',
        label: 'Confirmar contraseña',
        model: 'confirmPassword',
        disabled: false
      }
    ]
  })

  const models: Ref<RegisterCredentials> = ref<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const schemaValidations = z.object({
    name: z.string(),
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });;

  const errors = ref<Record<string, string[]>>({});

  return {
    config,
    models,
    schemaValidations,
    errors
  }
}