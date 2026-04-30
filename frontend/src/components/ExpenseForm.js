import { useState } from 'react'
import { getToken } from '../utils/auth'

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export default function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')
  const [date, setDate] = useState('')
  const [err, setErr] = useState('')

  const doSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const res = await fetch(`${API}/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ description, amount: Number(amount), category, date })
      })
      const dat = await res.json()
      if (!res.ok) throw new Error(dat.error || 'Could not add')
      onAdd(dat)
      setDescription('')
      setAmount('')
      setCategory('food')
      setDate('')
    } catch (error) {
      setErr(error.message)
    }
  }

  return (
    <form className="card formCard" onSubmit={doSubmit}>
      <h3>Add Expense</h3>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="food">food</option>
        <option value="transport">transport</option>
        <option value="utilities">utilities</option>
        <option value="shopping">shopping</option>
        <option value="health">health</option>
        <option value="other">other</option>
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      {err && <p className="errorTxt">{err}</p>}
      <button type="submit">Save</button>
    </form>
  )
}
