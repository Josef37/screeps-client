import authReducer, { signin, signout } from "./auth.slice";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const signInData = {
  serverUrl: "serverUrl",
  username: "username",
  password: "password",
};
const mockStore = configureMockStore([thunk]);
const axiosMock = new MockAdapter(axios);

describe("auth reducer", () => {
  it("should sign out", () => {
    expect(
      authReducer({ isLoading: false, user: { username: "test" } }, signout())
    ).toEqual({ isLoading: false });
  });

  it("should set loading state on sign in", () => {
    expect(
      authReducer(
        { isLoading: false },
        signin.pending(signin.pending.type, signInData)
      )
    ).toEqual({ isLoading: true });
  });
});

describe("auth thunks", () => {
  beforeEach(() => axiosMock.reset());

  it("should create a signin rejected action for invalid credentials", () => {
    const store = mockStore({ auth: {} });
    axiosMock.onPost("/api/auth/signin").reply(401, "Unauthorized");

    return store.dispatch(signin(signInData) as any).then(() => {
      expectActionTypes(store, [signin.pending.type, signin.rejected.type]);
    });
  });

  it("should create a signin fulfilled action for valid credentials", () => {
    const store = mockStore({ auth: {} });
    const token = "1234";
    axiosMock
      .onPost("/api/auth/signin")
      .reply(200, { token })
      .onGet(
        "/api/auth/me",
        undefined,
        expect.objectContaining({
          "X-Token": token,
          "X-Username": token,
        })
      )
      .reply(200, { username: "u", password: true });

    return store.dispatch(signin(signInData) as any).then(() => {
      expectActionTypes(store, [signin.pending.type, signin.fulfilled.type]);
    });
  });

  it("shouldn't even try when user is already set", () => {
    const store = mockStore({ auth: { user: "I am root 😈" } });

    return store.dispatch(signin(signInData) as any).then(() => {
      expect(store.getActions()).toHaveLength(0);
    });
  });

  it("shouldn't even try when already fetching", () => {
    const store = mockStore({ auth: { isLoading: true } });

    return store.dispatch(signin(signInData) as any).then(() => {
      expect(store.getActions()).toHaveLength(0);
    });
  });
});

// Expect the action types in the store to be in the same order as expected
const expectActionTypes = (
  store: MockStoreEnhanced<unknown, {}>,
  expectedActionTypes: string[]
): void => {
  const actions = store.getActions();
  expect(actions.length).toBe(expectedActionTypes.length);
  expectedActionTypes.forEach((type, i) =>
    expect(actions[i]).toHaveProperty("type", type)
  );
};
