import { useState } from 'react'
import { useAuth } from '../../context/useAuth'
import './Login.css'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = login(email, password)

    if (!result.success) {
      setError(result.message)
      return
    }

    alert(`Benvenuto ${result.user.nome}! Ruolo: ${result.user.role}`)
    setEmail('')
    setPassword('')
  }
    
  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='login-header'>
          <h1>GreenWay</h1>
        </div>

        <form className='login-form' onSubmit={handleSubmit}>
          {error && <div className='login-error-message'>{error}</div>}

          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type='email'id='email'name='email'value={email}onChange={(e) => setEmail(e.target.value)}required/>
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input type='password'id='password'name='password'value={password}onChange={(e) => setPassword(e.target.value)}required/>
          </div>
          <div className='button-container'>
            <button type='submit' className='login-button'>Conferma</button>
          </div>
        </form>
      </div>
    </div>
  )
}