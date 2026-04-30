import { Link, useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/auth'

function Navbar() {
  const nav = useNavigate()

  const doLogout = () => {
    removeToken()
    nav('/login')
  }

  return (
    <div className="navWrap">
      <div className="navLogo">Expense Tracker</div>
      <div className="navLinks">
        <Link to="/">Dashboard</Link>
        <Link to="/trends">Trends</Link>
        <button onClick={doLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
