import { getToken } from '../utils/auth'

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'

function ExpenseList({ expenses, onDelete }) {
  const del = async (id) => {
    const res = await fetch(`${API}/api/expenses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    const dat = await res.json()
    if (res.ok) onDelete(id)
    else alert(dat.error || 'delete failed')
  }

  if (!expenses.length) return <p className="card">No expenses yet</p>

  return (
    <div className="card">
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((x) => (
              <tr key={x._id}>
                <td>{new Date(x.date).toLocaleDateString()}</td>
                <td>{x.description || '-'}</td>
                <td>{x.category}</td>
                <td>PKR {x.amount}</td>
                <td><button onClick={() => del(x._id)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpenseList
