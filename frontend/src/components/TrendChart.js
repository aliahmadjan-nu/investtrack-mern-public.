function monthName(n) {
  const arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return arr[(n || 1) - 1]
}

export default function TrendChart({ monthlyData, categoryData, selectedCat, onClickCat }) {
  const max = Math.max(...monthlyData.map((x) => x.total), 1)

  return (
    <div className="card">
      <h3>Monthly Trend</h3>
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Total</th>
              <th>Bar</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((m, i) => {
              const prev = monthlyData[i - 1]
              const ch = prev ? (((m.total - prev.total) / (prev.total || 1)) * 100).toFixed(1) : '0.0'
              return (
                <tr key={`${m.year}-${m.month}`}>
                  <td>{monthName(m.month)} {m.year}</td>
                  <td>PKR {m.total}</td>
                  <td>
                    <div className="barBg">
                      <div className="barFill" style={{ width: `${(m.total / max) * 100}%` }} />
                    </div>
                    <small>{ch}%</small>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: 20 }}>Category Breakdown</h3>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Category</th><th>Total</th></tr>
          </thead>
          <tbody>
            {categoryData.map((c) => (
              <tr
                key={c.category}
                onClick={() => onClickCat(c)}
                className={selectedCat?.category === c.category ? 'rowActive' : ''}
              >
                <td>{c.category}</td>
                <td>PKR {c.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
