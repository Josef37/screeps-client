import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Register from './register.component'

import { useDispatch } from 'react-redux'
jest.mock('react-redux')

describe('Register component', () => {
  const dispatchMock = mockUseDispatch()

  beforeEach(() => {
    dispatchMock.mockReset()
    render(<Register />)
  })

  it('should not dispatch on empty server url', () => {
    clearInput(screen.getByLabelText('Server URL'))
    fireEvent.click(screen.getByText('Register', { selector: 'button' }))

    expect(dispatchMock).not.toBeCalled()
  })

  it('should not dispatch on empty username', () => {
    clearInput(screen.getByLabelText('Username'))
    fireEvent.click(screen.getByText('Register', { selector: 'button' }))

    expect(dispatchMock).not.toBeCalled()
  })

  it('should dispatch register even when password and email are empty', () => {
    setInputValue(screen.getByLabelText('Server URL'), 'http://localhost')
    setInputValue(screen.getByLabelText('Username'), 'username')
    clearInput(screen.getByLabelText('E-Mail', { exact: false }))
    clearInput(screen.getByLabelText('Password (can be empty)'))
    clearInput(screen.getByLabelText('Repeat Password', { exact: false }))
    fireEvent.click(screen.getByText('Register', { selector: 'button' }))

    expect(dispatchMock).toBeCalledTimes(1)
  })

  it('should not dispatch when password is not confirmed', () => {
    setInputValue(screen.getByLabelText('Server URL'), 'http://localhost')
    setInputValue(screen.getByLabelText('Username'), 'username')
    setInputValue(screen.getByLabelText('Password (can be empty)'), 'password')
    setInputValue(
      screen.getByLabelText('Repeat Password', { exact: false }),
      'misspelled password'
    )
    fireEvent.click(screen.getByText('Register', { selector: 'button' }))

    expect(dispatchMock).not.toBeCalled()
  })
})

function mockUseDispatch () {
  const dispatchMock = jest.fn()
  const useDispatchMock = jest.fn(() => dispatchMock)
  useDispatch.mockImplementation(useDispatchMock)
  return dispatchMock
}

function clearInput (input: any) {
  setInputValue(input, '')
}

function setInputValue (input: any, value: string) {
  fireEvent.change(input, { target: { value } })
}
