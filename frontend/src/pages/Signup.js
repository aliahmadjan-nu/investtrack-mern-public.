import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setToken } from '../utils/auth'

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const Signup = () => {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const doSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const dat = await res.json()
      if (!res.ok) throw new Error(dat.error || 'signup failed')
      setToken(dat.token)
      nav('/')
    } catch (error) {
      setErr(error.message)
    }
  }

  return (
    <div className="page authPage">
      <form className="card formCard" onSubmit={doSubmit}>
        <h2>Signup</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {err && <p className="errorTxt">{err}</p>}
        <button>Create Account</button>
        <p>Already have account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Signup
