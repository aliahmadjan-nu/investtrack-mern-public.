import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setToken } from '../utils/auth'

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'

function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function onSubmitClick(e) {
    e.preventDefault()
    setErr('')
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'login fail')
      setToken(data.token)
      nav('/')
    } catch (e) {
      setErr(e.message)
    }
  }

  return (
    <div className="page authPage">
      <form className="card formCard" onSubmit={onSubmitClick}>
        <h2>Login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {err && <p className="errorTxt">{err}</p>}
        <button>Login</button>
        <p>New user? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  )
}

export default Login
