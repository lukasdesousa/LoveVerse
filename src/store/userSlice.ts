import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Message {
  id: string;
  creatorName: string;
  destinataryName: string;
  spotifyLink: string;
  email: string;
  content: string;
  dateInit?: Date;
  expiresAt: string;
  // Outros campos que você precisar...
}

const initialState: Message = {
  id: '',
  creatorName: '',
  destinataryName: 'string',
  spotifyLink: 'string',
  email: 'string',
  content: 'string',
  dateInit: undefined,
  expiresAt: 'string',
};


export const createMessage = createAsyncThunk(
  'user/createMessage',
  async (messageData: Omit<Message, 'id'>, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao adicionar mensagem');
      } else {
        const data = await res.json();
        return data.message;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Erro desconhecido');
      }
      return rejectWithValue('Erro desconhecido');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  /*
  extraReducers: (builder) => {
    builder
      // Buscar usuário (pega tudo, inclusive mensagens)
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        if (state.user) {
          state.user.messages.push(action.payload);
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Atualizar usuário
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout do usuário (reseta tudo corretamente)
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; // Agora reseta tudo no logout
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  */
});

export default userSlice.reducer;