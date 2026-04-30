import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TrendChart from '../components/TrendChart'
import { getToken } from '../utils/auth'

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'

function Trends() {
  const [monthlyData, setMonthlyData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [selectedCat, setSelectedCat] = useState(null)

  useEffect(() => {
    loadThings()
  }, [])

  async function loadThings() {
    const headers = { Authorization: `Bearer ${getToken()}` }
    const a = await fetch(`${API}/api/trends/monthly`, { headers })
    const b = await fetch(`${API}/api/trends/category`, { headers })
    const ad = await a.json()
    const bd = await b.json()
    if (a.ok) setMonthlyData(ad)
    if (b.ok) setCategoryData(bd)
  }

  let trendText = 'Not enough data yet'
  let direction = ''
  if (monthlyData.length > 1) {
    const last = monthlyData[monthlyData.length - 1]
    const prev = monthlyData[monthlyData.length - 2]
    const diff = (((last.total - prev.total) / (prev.total || 1)) * 100).toFixed(1)
    direction = Number(diff) >= 0 ? 'UP' : 'DOWN'
    trendText = `Your spending is ${direction} this month (${diff}%)`
  }

  const top = categoryData[0]

  return (
    <div className="page">
      <Navbar />
      <div className="mainWrap">
        <h2>Trends</h2>
        <p>{trendText}</p>
        {top && <p>Top category right now: {top.category} (PKR {top.total})</p>}
        <TrendChart
          monthlyData={monthlyData}
          categoryData={categoryData}
          selectedCat={selectedCat}
          onClickCat={setSelectedCat}
        />
        {selectedCat && (
          <p className="card">You have spent PKR {selectedCat.total} on {selectedCat.category} in total</p>
        )}
      </div>
    </div>
  )
}

export default Trends
