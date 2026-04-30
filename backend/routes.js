const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Expense = require('./models/Expense')
const User = require('./models/User')
const { authMiddleware, validateExpense } = require('./middleware')

const router = express.Router()

router.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' })

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) return res.status(400).json({ error: 'Invalid email format' })

    const old = await User.findOne({ email })
    if (old) return res.status(400).json({ error: 'Email already exists' })

    const hash = await bcrypt.hash(password, 10)
    const userInfo = await User.create({ name, email, password: hash })
    const token = jwt.sign({ userId: userInfo._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return res.status(201).json({ token, name: userInfo.name })
  } catch (err) {
    console.log(err) // todo fix later
    return res.status(500).json({ error: err.message })
  }
})

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

    const u = await User.findOne({ email })
    if (!u) return res.status(400).json({ error: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, u.password)
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ userId: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return res.json({ token, name: u.name })
  } catch (err) {
    console.log('login err', err)
    return res.status(500).json({ error: err.message })
  }
})

router.get('/expenses', authMiddleware, async (req, res) => {
  try {
    const list = await Expense.find({ userId: req.userId }).sort({ date: -1 })
    return res.json(list)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.post('/expenses', authMiddleware, validateExpense, async (req, res) => {
  try {
    const { amount, category, description, date } = req.body
    const dat = await Expense.create({
      userId: req.userId,
      amount,
      category,
      description,
      date: date || new Date()
    })
    return res.status(201).json(dat)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.delete('/expenses/:id', authMiddleware, async (req, res) => {
  try {
    const one = await Expense.findById(req.params.id)
    if (!one) return res.status(404).json({ error: 'Expense not found' })
    if (String(one.userId) !== String(req.userId)) return res.status(403).json({ error: 'Forbidden' })

    await Expense.findByIdAndDelete(req.params.id)
    return res.json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.get('/trends/monthly', authMiddleware, async (req, res) => {
  try {
    const userObj = new mongoose.Types.ObjectId(req.userId)
    const out = await Expense.aggregate([
      { $match: { userId: userObj } },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ])

    const data2 = out.map((x) => ({
      year: x._id.year,
      month: x._id.month,
      total: x.total
    }))
    return res.json(data2)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.get('/trends/category', authMiddleware, async (req, res) => {
  try {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const userObj = new mongoose.Types.ObjectId(req.userId)

    const out = await Expense.aggregate([
      { $match: { userId: userObj, date: { $gte: start } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ])

    return res.json(out.map((x) => ({ category: x._id, total: x.total })))
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

module.exports = router
