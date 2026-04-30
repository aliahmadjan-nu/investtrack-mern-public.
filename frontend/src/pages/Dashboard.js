import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { getToken } from '../utils/auth'

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export default function Dashboard() {
  const [expenses, setExpenses] = useState([])
  const [catFilter, setCatFilter] = useState('all')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(`${API}/api/expenses`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    const dat = await res.json()
    if (res.ok) setExpenses(dat)
  }

  const addExpense = (item) => {
    setExpenses([item, ...expenses])
  }

  const deleteExpense = (id) => {
    const tmp = expenses.filter((x) => x._id !== id)
    setExpenses(tmp)
  }

  const shown = catFilter === 'all' ? expenses : expenses.filter((x) => x.category === catFilter)

  return (
    <div className="page">
      <Navbar />
      <div className="mainWrap">
        <ExpenseForm onAdd={addExpense} />
        <div className="card">
          <label>Filter category: </label>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
            <option value="all">all</option>
            <option value="food">food</option>
            <option value="transport">transport</option>
            <option value="utilities">utilities</option>
            <option value="shopping">shopping</option>
            <option value="health">health</option>
            <option value="other">other</option>
          </select>
        </div>
        <ExpenseList expenses={shown} onDelete={deleteExpense} />
      </div>
    </div>
  )
}
