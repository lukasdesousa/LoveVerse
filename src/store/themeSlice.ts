import { createSlice } from '@reduxjs/toolkit';

const storedTheme =
  typeof window !== 'undefined' ? localStorage.getItem('theme') : null;

const initialState = {
  theme: storedTheme === 'dark' ? 'dark' : 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      // Atualiza a classe do <html>
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
        localStorage.setItem('theme', state.theme);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
        localStorage.setItem('theme', state.theme);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
