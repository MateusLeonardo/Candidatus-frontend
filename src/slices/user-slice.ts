'use client';
import { IUser } from "@/features/auth/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
    id: "",
    email: "",
}

const localStorageKey = 'user';

const getUserFromLocalStorage = () => {
    if (typeof window === 'undefined') return null;
    
    try {
        const userStr = localStorage.getItem(localStorageKey);
        if(!userStr) return null;
        return JSON.parse(userStr) as IUser;
    } catch (error) {
        console.error('Erro ao ler usuário do localStorage:', error);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(localStorageKey);
        }
        return null;
    }
}

const setUserToLocalStorage = (user: IUser) => {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.setItem(localStorageKey, JSON.stringify(user));
    } catch (error) {
        console.error('Erro ao salvar usuário no localStorage:', error);
    }
}

const removeUserFromLocalStorage = () => {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.removeItem(localStorageKey);
    } catch (error) {
        console.error('Erro ao remover usuário do localStorage:', error);
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) =>  {
            state.id = action.payload.id;
            state.email = action.payload.email;
            setUserToLocalStorage(action.payload);
        },
        resetUser: () => {
            removeUserFromLocalStorage();
            return initialState;
        },
        loadUserFromStorage: (state) => {
            const storedUser = getUserFromLocalStorage();
            if (storedUser) {
                state.id = storedUser.id;
                state.email = storedUser.email;
            }
        },
    }
})

export const { setUser, resetUser, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;