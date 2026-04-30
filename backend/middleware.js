const jwt = require('jsonwebtoken')

const allowedCats = ['food', 'transport', 'utilities', 'shopping', 'health', 'other']

function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization || ''
    const tok = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null
    if (!tok) return res.status(401).json({ error: 'Token missing' })

    const dat = jwt.verify(tok, process.env.JWT_SECRET)
    req.userId = dat.userId
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

function validateExpense(req, res, next) {
  const { amount, category } = req.body
  if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Amount should be positive number' })
  }
  if (!allowedCats.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' })
  }
  next()
}

module.exports = { authMiddleware, validateExpense }
