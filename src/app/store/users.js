import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";
import userService from "../service/user.service";
import generetaAuthError from "../utils/generateAuthError";
import history from "../utils/history";
import randomInt from "../utils/randomInt";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccessed: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailde: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.auth = null;
            state.isLoggedIn = false;
            state.dataLoaded = false;
        },
        userUpdatedSuccessed: (state, action) => {
            const elementIndex = state.entities.findIndex(
                (e) => e._id === action.payload._id
            );
            state.entities[elementIndex] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});
const { actions, reducer: usersReducer } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFailed,
    authRequestSuccessed,
    authRequestFailde,
    userCreated,
    userLoggedOut,
    userUpdatedSuccessed,
    authRequested
} = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");

const createUserFailde = createAction("users/createUserFailde");
const updateUserFailde = createAction("users/updateUserFailde");

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdatedSuccessed(content));
        history.replace(`/users/${content._id}`);
    } catch (error) {
        dispatch(updateUserFailde(error.message));
    }
};

export function logOut() {
    return (dispatch) => {
        localStorageService.removeAuthData();
        dispatch(userLoggedOut());
        history.replace("/");
    };
}

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.logIn(payload);
            localStorageService.setTokens(data);
            dispatch(
                authRequestSuccessed({
                    userId: data.localId,
                    email: payload.email
                })
            );
            redirect();
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generetaAuthError(message);
                dispatch(authRequestFailde(errorMessage));
            } else {
                dispatch(authRequestFailde(error.message));
            }
        }
    };

export const singUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccessed({ userId: data.localId, email }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: randomInt(1, 5),
                    completedMeetings: randomInt(0, 200),
                    imge: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generetaAuthError(message);
                dispatch(authRequestFailde(errorMessage));
            } else {
                dispatch(authRequestFailde(error.message));
            }
        }
    };

function createUser(payload) {
    return async (dispatch) => {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(createUserFailde(error.message));
        }
    };
}

export const loadUsersList = () => async (dispatch) => {
    try {
        dispatch(usersRequested());
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFailed());
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersLoadStatus = () => (state) => state.users.isLoading;
export const getCurrentUserData = () => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(
            (u) => u._id === state.users.auth.userId
        );
    } else {
        return null;
    }
};
export const getUserById = (id) => (state) => {
    if (state.users.entities)
        return state.users.entities.find((u) => u._id === id);
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
