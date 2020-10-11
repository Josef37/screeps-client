import * as React from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/auth/auth.slice'
import Auth, { Inputs } from '../auth/auth.component'

const Register = () => {
  const dispatch = useDispatch()
  const handleSubmit = (inputs: Inputs) => {
    const { serverUrl, username, email, password, confirmPassword } = inputs

    if (!serverUrl || !username || password !== confirmPassword) return
    dispatch(register({ serverUrl, username, email, password }))
  }

  return <Auth isRegistration handleSubmit={handleSubmit} />
}

export default Register
