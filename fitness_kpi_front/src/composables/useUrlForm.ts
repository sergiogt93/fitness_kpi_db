import { ref, type Ref } from 'vue';
import type { FormConfig } from '@/types/FormField'
import type { UrlPost } from '@/types/Url'
import { z } from 'zod';
import axios, { setCsrfToken } from '@/axiosInstance';
import { useRouter } from 'vue-router';

export const useUrlForm = () => {
  const error = ref<string | null>(null);
  const router = useRouter();
  const config: Ref<FormConfig> = ref<FormConfig>({
    fields: [
      {
        type: 'text',
        label: 'Url',
        model: 'url',
        disabled: false
      },
    ]
  })

  const models: Ref<UrlPost> = ref<UrlPost>({
    url: '',
  })

  const schemaValidations = z.object({
    url: z.string().url("Debe ser un url válida"),
  });

  const saveShortenUrl = async (body: UrlPost) => {
    try {
        await setCsrfToken();
        await axios.post('/shorten', body);
        router.push('/dashboard');
    } catch (e: any) {
        error.value = e.response?.data?.message || 'Registration failed';
    }
};

  return {
    config,
    models,
    schemaValidations
  }
}