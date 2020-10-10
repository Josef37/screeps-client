import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../root.reducer";

/* Type Definitions */

type User = Partial<{
    _id: string,
    email: string
    username: string
    cpu: number,
    password: boolean,
    gcl: number,
    blocked: boolean,
    money: number,
    steam: {},
    powerExperimentations: number,
    powerExperimentationTime: number
}>

type UserCredentials = {
    name: string,
    password: string
}

type UserState = {
    isLoading: boolean,
    error?: string,
    user?: User
}


/* Thunks */

export const signin = createAsyncThunk(
    'user/signin',
    async (user: UserCredentials): Promise<User> => {
        return { username: user.name, password: !!user.password }
    }, {
    condition: (_user, { getState }) => {
        const state = getState() as RootState;
        if (state.user.user || state.user.isLoading) return false;
    }
})


/* Slice */

const initialState: UserState = {
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signout: (state) => {
            delete state.user
        }
    },
    extraReducers: builder => {
        builder.addCase(signin.pending, (state) => {
            state.isLoading = true
            delete state.error
        })
        builder.addCase(signin.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false
            delete state.error
            state.user = action.payload;
        })
        builder.addCase(signin.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message;
        })
    }
})

export const { signout } = userSlice.actions

export default userSlice.reducer