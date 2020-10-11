import * as React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from '../redux/root.reducer'
import { MockStoreEnhanced } from 'redux-mock-store'

const customRender = (
  ui: React.ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState
    }),
    ...renderOptions
  }: Partial<any>
) => {
  const Wrapper: React.FunctionComponent = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }
  render(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { customRender as render }

// Expect the action types in the store to be in the same order as expected
export const expectActionTypes = (
  store: MockStoreEnhanced<unknown, {}>,
  expectedActionTypes: string[]
): void => {
  const actions = store.getActions()
  expect(actions.length).toBe(expectedActionTypes.length)
  expectedActionTypes.forEach((type, i) =>
    expect(actions[i]).toHaveProperty('type', type)
  )
}
