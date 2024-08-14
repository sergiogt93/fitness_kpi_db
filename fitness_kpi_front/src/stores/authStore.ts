import { defineStore } from 'pinia';
import axios, { setCsrfToken } from '@/axiosInstance';
import { ref } from 'vue';
import type { User, LoginCredentials,RegisterCredentials } from '@/types/User';
import { useRouter } from 'vue-router/dist/vue-router';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const error = ref<string | null>(null);
    const user = ref<User | null>(null);
    const router = useRouter();

    const register = async (body: RegisterCredentials) => {
        try {
            await setCsrfToken();
            await axios.post('/register', body);
            login(body);
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Registration failed';
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            await setCsrfToken();
            const response = await axios.post('/login', credentials);
            token.value = response.data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
            getSessionUser();
            if (token.value) {
                router.push('/dashboard');
            }
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Login failed';
        }
    };

    const getSessionUser = async () => {
        try {
            await setCsrfToken();
            const response = await axios.get('/user');
            user.value = response.data;
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Login failed';
        }
    };

    const logout = async () => {
        await axios.post('/logout');
        token.value = null;
        user.value = null;
        axios.defaults.headers.common['Authorization'] = '';
    };

    return {
        token,
        error,
        register,
        login,
        logout,
        getSessionUser
    };
});

