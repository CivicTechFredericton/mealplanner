import React, { useState } from 'react';
import { authenticate } from './auth'

export default function Login() {
  const [userEmail, setUserEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)

  async function doLogin() {
    try {
      setError(false)
      await authenticate({ userEmail, password })
      window.location = "/"
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  return (
    <div>
      username
      <input
        onChange={event => setUserEmail(event.target.value)}
        value={userEmail}
      />
      <br/>
      password 
      <input
        type="password"
        onChange={event => setPassword(event.target.value)}
        value={password}
      />
      <br />
      <button
        onClick={doLogin}
      >
      login
      </button>
      {error && (
        <div>Error!!!</div>
      )}
    </div>
  )
}