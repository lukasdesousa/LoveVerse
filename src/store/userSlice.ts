import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface Message {
  id: string;
  creatorName: string;
  destinataryName: string;
  spotifyLink: string;
  content: string;
  dateInit?: Date;
  expiresAt: string;
  // Outros campos que você precisar...
}

interface User {
  id: string;
  name: string;
  email: string;
  messages: Message[];
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Thunk para buscar usuário (pega tudo, incluindo mensagens)
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/user", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erro: ${res.status}`);
    }

    const data = await res.json();
    return data.user as User;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || 'Erro desconhecido');
    }
    return rejectWithValue('Erro desconhecido');
  }
});

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
      }

      const data = await res.json();
      console.log(typeof data.message)
      return data.message as Message[];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Erro desconhecido');
      }
      return rejectWithValue('Erro desconhecido');
    }
  }
);

// Thunk para atualizar usuário (sem apagar mensagens)
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, name, email }: { id: string; name: string; email: string }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, email }), // Remove mensagens para não sobrescrevê-las
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao atualizar usuário");
      }

      const data = await res.json();
      return data.user as User;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Erro desconhecido');
      }
      return rejectWithValue('Erro desconhecido');
    }
  }
);

// Thunk para logout do usuário
export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Erro ao fazer logout");
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Erro desconhecido");
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Buscar usuário (pega tudo, inclusive mensagens)
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        if (state.user) {
          // Certifique-se de que messages é um array
          if (!Array.isArray(state.user.messages)) {
            state.user.messages = [];
          }
          state.user.messages.push(...action.payload);
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
});

export default userSlice.reducer;
