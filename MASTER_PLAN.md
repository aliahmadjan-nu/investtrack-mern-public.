# MASTER PLAN — Full Stack FinTech Assignment
## Roll No: 23i-5503 | BS FinTech Semester 6 | Web Programming

---

## ASSIGNMENT DECODE

| Field | Value |
|---|---|
| Roll Number | 23i-5503 |
| Last Two Digits | 03 |
| digit₁ (0) → Table A | Expense Management |
| digit₂ (3) → Table B | Trend Analysis |
| (0+3) % 3 = 0 → Table C | Basic (1 collection) |

**Your system:** An Expense Management app where the core logic is Trend Analysis — the system must analyze spending patterns over time, identify trends (e.g. which category is increasing, monthly spend direction, peak spending periods) and display this visibly to the user. One MongoDB collection. MERN stack.

---

## WHAT THE AGENT BUILDS VS WHAT YOU DO MANUALLY

### Agent builds everything:
- Full React frontend (all pages, routing, components, styling)
- Full Node.js + Express backend (all routes, middleware, logic)
- MongoDB schema and all queries
- JWT authentication system
- All trend analysis logic
- All connection and config files

### You do manually (agent will STOP and ask you):
1. Create MongoDB Atlas cluster and get connection string
2. Create account on Render (backend) — Vercel already set up
3. Set environment variables on Render and Vercel
4. Deploy backend on Render
5. Deploy frontend on Vercel (you have an account — just need to connect repo)
6. Write handwritten answers (Part D)

---

## TECH STACK (strictly from course notes)

- **Frontend:** React.js (create-react-app), React Router, useState hook
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (jsonwebtoken) + bcrypt
- **HTTP client:** fetch API (native, no axios — keeping it simple)
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (DB)

---

## HUMANISATION RULES — AGENT MUST FOLLOW EVERY SINGLE ONE

These rules exist so the code looks like it was written by a university student, not an AI. The agent must follow all of them without exception.

### Variable & Function Naming
- Mix camelCase and occasional snake_case inconsistently (e.g. `expenseData` but also `get_trends` in one place)
- Use short lazy names sometimes: `res`, `req`, `dat`, `tmp`, `val`, `e`, `err`
- Avoid perfect descriptive names — use `stuff`, `info`, `data2`, `myExpenses`, `temp`
- Never use perfectly structured names like `handleFormSubmission` — use `handleSubmit` or `doSubmit` or `onSubmitClick`
- Occasional single-letter variables in loops: `i`, `j`, `x`
- Some variable names should have slight awkwardness: `expensesList` instead of `expenses`, `userInfo` instead of `user`

### Comments
- Either NO comments or very few and they should be sloppy
- Bad comment examples to use: `// works dont touch`, `// idk why this works but it does`, `// todo fix this later`, `// temp`, `// had to add this for it to work`
- Never write documentation-style comments with full sentences
- No JSDoc, no block comments explaining parameters
- If a comment exists it should be 2-4 words max most of the time

### Code Formatting & Indentation
- Mostly consistent indentation (2 spaces) but with occasional 4-space or misaligned blocks — not every line, just 2-3 places per file
- Random extra blank lines in the middle of functions
- Occasional missing semicolons (JavaScript allows this) in a few places
- Some lines longer than 80 chars without breaking them
- Inconsistent spacing around operators in a few places: `x+1` vs `x + 1`
- Don't prettify everything — leave some raw-looking code

### Code Structure
- Not every function needs to be extracted — leave some inline logic that could have been a function
- Some repeated code (copy-paste style) in 1-2 places instead of DRY
- One or two `console.log` statements left in (like `console.log('here')` or `console.log(err)`)
- Imports not always perfectly ordered — mix default and named imports randomly
- Some unused imports left in (1-2 per file max)

### React Specific
- Mix of arrow functions and regular functions inconsistently
- useEffect with some missing dependency warnings (not fixing them)
- Inline styles mixed with CSS classes in some places
- Not every component is perfectly separated — a couple of small things left inline
- className strings should sometimes be plain strings without template literals where it doesn't matter
- Form handling should be slightly verbose in some places

### CSS / Styling
- No Tailwind, no Bootstrap, no component libraries — plain CSS files
- CSS file should have some redundant rules and overrides
- Inconsistent spacing between CSS rules
- Some hardcoded pixel values that could be variables
- Color values repeated as hex instead of variables in some places
- The design should look like a student made it — clean enough to work, not Dribbble-level
- Font: use ONE Google Font (not Inter, not Roboto — pick something like `Syne`, `DM Sans`, `Outfit`, or `Space Mono` — pick one that feels student-ish)
- Color palette: dark navy or charcoal background with one accent color (NOT purple gradient — something like teal, amber, or slate blue)
- No animations or fancy transitions — keep it static and functional
- Cards, tables, simple buttons — no glassmorphism, no shadows everywhere

### File Structure
- Keep it slightly flat — don't over-engineer the folder structure
- Not every component in its own folder with index.js — just flat .js files in components/
- CSS files can be per-component or one big App.css — mix it

### Backend Specific
- Route files should be one file (routes.js) not separated by resource
- Error handling should be basic — `try/catch` with `res.status(500).json({error: err.message})`
- Middleware should be simple and slightly verbose
- No fancy abstractions — direct mongoose queries in route handlers
- Controller pattern not needed — just routes file and index.js

---

## FOLDER STRUCTURE

```
expense-tracker/
├── backend/
│   ├── index.js
│   ├── routes.js
│   ├── middleware.js
│   ├── models/
│   │   └── Expense.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   └── Trends.js
│   │   ├── components/
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   ├── TrendChart.js
│   │   │   └── Navbar.js
│   │   └── utils/
│   │       └── auth.js
│   └── package.json
```

---

## MONGODB SCHEMA (1 Collection — Basic Complexity)

**Collection name:** `expenses`

```js
// models/Expense.js
const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['food', 'transport', 'utilities', 'shopping', 'health', 'other'],
    required: true 
  },
  description: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true })
```

**Two meaningful queries (required by assignment):**
1. Aggregation — group expenses by month and sum amounts → used for trend line
2. Aggregation — group by category and sum → used for category breakdown

---

## PAGES & ROUTES

| Page | Route | Protected? | Description |
|---|---|---|---|
| Login | `/login` | No | JWT login form |
| Signup | `/signup` | No | Register new user |
| Dashboard | `/` | Yes | Add expense, view list, delete |
| Trends | `/trends` | Yes | Trend analysis charts/tables |

---

## API ROUTES

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Register user, return JWT |
| POST | `/api/auth/login` | No | Login, return JWT |
| GET | `/api/expenses` | Yes | Get all expenses for logged-in user |
| POST | `/api/expenses` | Yes | Add new expense |
| DELETE | `/api/expenses/:id` | Yes | Delete expense by ID |
| GET | `/api/trends/monthly` | Yes | Aggregation: monthly spend totals |
| GET | `/api/trends/category` | Yes | Aggregation: spend by category |

---

## CORE FINTECH LOGIC — TREND ANALYSIS

This is the most important part (15 marks). The logic must be implemented and visible.

**What the system does:**
1. Takes all expenses for the logged-in user
2. Groups them by month (Jan, Feb, Mar etc.) and calculates total spend per month
3. Calculates month-over-month change: if this month > last month, flag as "increasing"
4. Groups by category and finds which category has grown the most compared to previous month
5. Identifies the user's top spending category
6. Shows a trend direction label: "Your spending is UP this month" or "DOWN" with percentage

**Trend logic in backend (pseudo-code the agent will implement):**
```
monthly totals = aggregate expenses grouped by year-month
for each consecutive month pair:
  change = (current - previous) / previous * 100
  direction = current > previous ? 'up' : 'down'

top category = category with highest total this month
fastest growing = category with highest % increase month over month
```

**Frontend display:**
- A simple table showing Month | Total Spent | Change %
- A text summary: "In March you spent PKR X, which is Y% more than February"
- Category breakdown table
- One trend insight: "Your food spending has increased 3 months in a row"

No external chart libraries — just styled HTML tables and simple CSS bars (inline width style based on percentage) to keep it in scope of course notes.

---

## AUTHENTICATION SYSTEM

- Users stored separately in a `users` collection (just this one extra — still "basic" since the main entity is expenses)
- On signup: hash password with bcrypt, store user, return JWT
- On login: compare password hash, return JWT
- JWT stored in localStorage
- Protected routes: React checks localStorage for token, redirects to /login if missing
- Backend middleware: verifies JWT on protected routes, attaches userId to req

---

## STEP BY STEP BUILD ORDER FOR AGENT

### PHASE 1 — Project Scaffolding

**Step 1.1** Create backend folder, init npm, install dependencies:
```
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
npm install --save-dev nodemon
```

**Step 1.2** Create frontend with create-react-app:
```
npx create-react-app frontend
cd frontend
npm install react-router-dom
```

---

### PHASE 2 — Backend

**Step 2.1 — index.js**
- Import express, mongoose, cors, dotenv
- Connect to MongoDB using MONGO_URI from .env
- Mount routes from routes.js at /api
- Listen on PORT from .env (default 5000)

**Step 2.2 — models/Expense.js**
- Define expense schema as above
- Export model

**Step 2.3 — models/User.js**
- Fields: email (unique), password (hashed), name, createdAt
- Export model

**Step 2.4 — middleware.js**
- `authMiddleware`: extract Bearer token from Authorization header, verify JWT, attach `req.userId`
- `validateExpense`: check that amount is a positive number and category is in allowed list
- Export both

**Step 2.5 — routes.js — Auth routes**
- POST /auth/signup: validate email+password exist, check duplicate email, hash password, create user, sign JWT, return token + user name
- POST /auth/login: find user by email, compare password, sign JWT, return token

**Step 2.6 — routes.js — Expense routes (all protected)**
- GET /expenses: find all expenses where userId matches req.userId, sort by date desc
- POST /expenses: use validateExpense middleware, create expense with req.userId, return saved expense
- DELETE /expenses/:id: find expense, check userId matches req.userId, delete, return success

**Step 2.7 — routes.js — Trend routes (all protected)**
- GET /trends/monthly: mongoose aggregate on expenses collection
  - Match userId
  - Group by {year: $year, month: $month of date field}
  - Sum amounts
  - Sort by year+month
  - Return array of {year, month, total}
- GET /trends/category: mongoose aggregate
  - Match userId and filter to last 2 months
  - Group by category
  - Sum amounts
  - Sort desc by total

---

### PHASE 3 — Frontend

**Step 3.1 — index.js**
- Render App wrapped in nothing extra — keep it simple

**Step 3.2 — App.js**
- Import BrowserRouter, Routes, Route from react-router-dom
- Import all 4 pages
- Define routes: /, /login, /signup, /trends
- ProtectedRoute component: check localStorage.getItem('token'), if null redirect to /login

**Step 3.3 — utils/auth.js**
- `getToken()`: return localStorage.getItem('token')
- `setToken(token)`: localStorage.setItem('token', token)
- `removeToken()`: localStorage.removeItem('token')
- `isLoggedIn()`: return !!getToken()

**Step 3.4 — pages/Login.js**
- Two inputs: email, password — controlled with useState
- On submit: POST to /api/auth/login, save token, redirect to /
- Link to /signup

**Step 3.5 — pages/Signup.js**
- Three inputs: name, email, password
- On submit: POST to /api/auth/signup, save token, redirect to /
- Link to /login

**Step 3.6 — components/Navbar.js**
- Show app name on left
- Links to Dashboard and Trends
- Logout button: removeToken() then redirect to /login

**Step 3.7 — components/ExpenseForm.js**
- Inputs: description (text), amount (number), category (select dropdown), date (date input)
- On submit: POST to /api/expenses with Bearer token
- Call parent onAdd callback after success
- Clear form after

**Step 3.8 — components/ExpenseList.js**
- Receives expenses array and onDelete callback as props
- Renders a table: Date | Description | Category | Amount | Delete button
- Empty state: show a plain text message
- Delete: call DELETE /api/expenses/:id with token, then call onDelete(id)

**Step 3.9 — pages/Dashboard.js**
- On mount (useEffect): fetch GET /api/expenses, set expenses state
- Render Navbar, ExpenseForm, ExpenseList
- addExpense function: add to state after POST succeeds
- deleteExpense function: remove from state after DELETE succeeds

**Step 3.10 — components/TrendChart.js**
- Receives monthlyData and categoryData as props
- Renders monthly trend as a styled HTML table with a simple CSS bar column
- Bar: a div with background color and width set as inline style based on % of max
- Shows trend direction arrow text: if last month > second-to-last, show "Spending UP" else "Spending DOWN"
- Renders category breakdown as second table

**Step 3.11 — pages/Trends.js**
- On mount: fetch both /api/trends/monthly and /api/trends/category
- Compute trend insights in frontend:
  - Most recent month vs previous month → percentage change
  - Category with highest total
- Render Navbar, a heading, TrendChart component, text summary paragraph

---

### PHASE 4 — Styling

**Step 4.1 — App.css / index.css**
- Import one Google Font (Outfit or Syne) at top
- Root variables: dark background (#0f1117 or similar), accent color (#4ecca3 teal or #f59e0b amber), text color, card background
- Base styles: body, * box-sizing, h1-h3, a, button
- Navbar styles: horizontal flex, dark bar, accent color for active links
- Form styles: stacked inputs, full width, minimal border, accent colored submit button
- Table styles: full width, alternating row colors subtle, no heavy borders
- Trend bar styles: bar container div, colored fill div
- Page containers: max-width 900px, margin auto, padding
- Responsive: one media query at 600px — stack flex items, full width inputs
- Keep it slightly flat and student-looking — no box shadows everywhere, no rounded corners on everything

---

### PHASE 5 — PAUSE POINTS (Agent stops, asks you)

The agent will STOP at these points and wait for your input before continuing:

---

#### PAUSE POINT 1 — MongoDB Atlas Setup

**Agent stops and says:**
> "I need your MongoDB connection string. Here is exactly how to get it:
> 1. Go to https://cloud.mongodb.com and sign up for free
> 2. Create a new project (name it anything)
> 3. Create a free M0 cluster (shared, free tier) — pick any region
> 4. In Security > Database Access: Add a user with username and password (save these)
> 5. In Security > Network Access: Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
> 6. In your cluster, click Connect → Drivers → Copy the connection string
> 7. Replace <password> in the string with your actual password
> 8. Paste the full connection string here"

Agent then creates the `.env` file:
```
MONGO_URI=<paste here>
JWT_SECRET=myfintechsecretkey2024
PORT=5000
```

---

#### PAUSE POINT 2 — Render Deployment (Backend)

**Agent stops and says:**
> "Time to deploy the backend. Here is exactly what to do:
> 1. Push your backend folder to a GitHub repository (create one at github.com if needed)
>    - git init inside backend/
>    - git add . && git commit -m 'initial'
>    - Create repo on GitHub, push to it
> 2. Go to https://render.com and sign up with GitHub
> 3. Click 'New' → 'Web Service'
> 4. Connect your GitHub repo
> 5. Settings:
>    - Name: expense-tracker-api (or anything)
>    - Root Directory: leave blank if backend is the root
>    - Build Command: npm install
>    - Start Command: node index.js
>    - Instance type: Free
> 6. Add Environment Variables (in Render dashboard → Environment):
>    - MONGO_URI = (your connection string)
>    - JWT_SECRET = myfintechsecretkey2024
>    - PORT = 5000
> 7. Click Deploy
> 8. Wait for deploy to finish (5-10 minutes)
> 9. Copy the live URL (looks like: https://expense-tracker-api-xxxx.onrender.com)
> 10. Paste the URL here"

Agent then updates the frontend API base URL to use this live URL.

---

#### PAUSE POINT 3 — Vercel Deployment (Frontend)

**Agent stops and says:**
> "You already have a Vercel account. Time to deploy the frontend. Here is exactly what to do:
> 1. Make sure your frontend code is pushed to GitHub (separate repo or in a /frontend subfolder of your main repo)
>    - Inside the frontend/ folder: git init, git add ., git commit -m 'initial'
>    - Create a GitHub repo, push to it
> 2. Log in to https://vercel.com with your existing account
> 3. Click 'Add New' → 'Project' → Import your GitHub repo
> 4. If your frontend is in a subfolder, set Root Directory to 'frontend'
> 5. Framework preset will auto-detect as Create React App — leave it
> 6. Under 'Environment Variables' add:
>    - Name: REACT_APP_API_URL
>    - Value: (your Render backend URL from Pause Point 2)
> 7. Click Deploy
> 8. Wait 2-3 minutes
> 9. Copy the live .vercel.app URL and paste it here"

---

#### PAUSE POINT 3.5 — Update CORS on Render After Vercel Deploy

**Agent stops and says:**
> "One last step to connect frontend and backend properly.
> 1. Go to https://render.com → Your backend service → Environment
> 2. Add a new environment variable:
>    - Name: FRONTEND_URL
>    - Value: (your Vercel URL from Pause Point 3, e.g. https://expense-tracker-abc.vercel.app)
> 3. Click Save Changes — Render will automatically redeploy (takes 2-3 minutes)
> 4. Once redeployed, test: open your Vercel URL, try to log in
> 5. If login works, you're done. If you see a CORS error in the browser console, paste it here."

---

#### PAUSE POINT 4 — Handwritten Answers (Part D)

**Agent stops and provides exact answers for you to write by hand:**

> "Write these on paper in your own handwriting. Slightly paraphrase each answer in your own words — do not copy word for word."

**Q1 — System Flow Diagram (draw this):**
```
[React Frontend (Vercel)]
        |
        | HTTP requests with JWT token
        v
[Express Backend (Render)]
        |
        | mongoose queries
        v
[MongoDB Atlas]
        |
        | documents returned
        v
[Express Backend]
        |
        | JSON response
        v
[React Frontend — updates state → re-renders UI]
```

**Q2 — One API Route Step by Step (pick POST /expenses):**
- Request arrives at POST /api/expenses with Authorization header and JSON body
- authMiddleware runs first: extracts token from header, verifies with JWT_SECRET, attaches userId to req object
- validateExpense middleware runs: checks amount > 0, checks category is in allowed list
- Route handler runs: creates new Expense document with amount, category, description, date, and req.userId
- Mongoose saves document to MongoDB Atlas
- Handler returns the saved document as JSON with status 201

**Q3 — Database Relationship:**
- Using referencing: userId field in expenses collection stores the ObjectId of the user
- Chose referencing over embedding because users and expenses are separate entities. If embedded, you'd have to update a large user document every time an expense is added. With referencing, expenses are lean and can be queried independently by userId. Also allows future expansion.

**Q4 — Core FinTech Logic:**
- The system fetches all expenses for the user from MongoDB
- Uses MongoDB aggregation pipeline to group expenses by year+month and sum amounts
- For each consecutive pair of months, calculates percentage change: (current - previous) / previous * 100
- If current month total > previous month total, the trend direction is "UP"
- The category with the highest total in the most recent month is flagged as "top category"
- This is displayed on the Trends page as a table and a text summary

**Q5 — Real Security Flaw:**
- Vulnerability: JWT_SECRET is a weak hardcoded string "myfintechsecretkey2024". If someone discovers it, they can forge any JWT token and access any user's data.
- Fix: Use a randomly generated 256-bit secret stored as an environment variable, never commit it to GitHub. Rotate the secret periodically. Also set a short expiry time (1h) on JWTs so stolen tokens expire quickly.

---

### PHASE 6 — Security Implementation

Two security measures (required by assignment):

**Security 1 — Input validation middleware:**
- Check that amount is a number and positive
- Check category is in the enum list
- Check email format on signup
- Return 400 with descriptive error if validation fails

**Security 2 — Protected routes frontend + backend:**
- Frontend: ProtectedRoute component in App.js checks token, redirects to /login
- Backend: authMiddleware on all expense and trend routes

---

### PHASE 7 — Responsiveness

- Navbar collapses to stacked layout below 600px
- Forms go full width
- Tables scroll horizontally if needed (overflow-x: auto on table wrapper)
- No layout breakage — test at 375px width (iPhone SE)

---

### PHASE 8 — User Interaction (2 required)

**Interaction 1:** Category filter on Dashboard — a simple select dropdown that filters the displayed expense list by category. This is frontend-only, no extra API call needed.

**Interaction 2:** On the Trends page, clicking on a category row in the breakdown table highlights that row and shows a text detail below: "You have spent PKR X on [category] in total"

---

## ENVIRONMENT VARIABLES

**Backend .env:**
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=myfintechsecretkey2024
PORT=5000
```

**Frontend .env:**
```
REACT_APP_API_URL=https://your-render-url.onrender.com
```

In frontend code, all API calls use: `process.env.REACT_APP_API_URL`

---

## PART B — TECHNICAL REPORT OUTLINE

The agent will NOT write the report — you write it. But here is the exact outline to follow for all 7 required sections:

**Section 1 — Problem Definition**
Write 1 paragraph: Students struggle to track daily expenses and have no visibility into where their money goes over time. This system lets them log expenses and see monthly trends so they can adjust their spending behavior.

**Section 2 — System Architecture**
Include a diagram showing React → Express → MongoDB. Describe each layer in 2-3 sentences each.

**Section 3 — Database Design**
Draw the expenses schema table. Explain the fields and their types. Explain why you used referencing for userId.

**Section 4 — Core Logic Explanation**
Explain the aggregation pipeline step by step. Use a small example with 3 months of data.

**Section 5 — Query Explanation**
Explain both aggregation queries with what they return and why they matter.

**Section 6 — Security Analysis**
Explain JWT auth, input validation, and why both are needed.

**Section 7 — Scalability Discussion**
At 10,000 users: MongoDB needs indexes on userId and date fields, Express needs to be stateless for horizontal scaling, JWT is already stateless so that scales, frontend on Vercel auto-scales.

---

## FULL AUDIT CHECKLIST

The agent runs this audit at the end before declaring the project done.

### Part A — Implementation Audit

- [ ] Login page exists with email + password form
- [ ] Signup page exists with name + email + password form
- [ ] On login/signup, JWT token is saved to localStorage
- [ ] Protected routes redirect to /login if no token
- [ ] Session persists on page refresh (token stays in localStorage)
- [ ] Expense schema has all required fields with correct types
- [ ] userId field exists and connects expense to user
- [ ] Monthly aggregation query implemented and returns data
- [ ] Category aggregation query implemented and returns data
- [ ] Trend analysis logic computes month-over-month change
- [ ] Trend direction is visibly shown to user on Trends page
- [ ] Category insight is shown to user
- [ ] Backend has minimum 3 routes (has 7 — passes)
- [ ] authMiddleware implemented and applied to protected routes
- [ ] Input validation middleware implemented
- [ ] Frontend has minimum 3 pages: Login, Signup, Dashboard, Trends (has 4 — passes)
- [ ] All data is fetched from backend — no hardcoded data on frontend
- [ ] React Router is used for navigation
- [ ] Input validation on forms (frontend)
- [ ] Protected routes on frontend AND backend
- [ ] Invalid API calls return proper error responses
- [ ] Site works on mobile (375px) without layout breakage
- [ ] Category filter interaction works
- [ ] Trends page row click interaction works

### Part B — Report Audit

- [ ] Report is 5-7 pages
- [ ] All 7 sections present
- [ ] Database schema diagram included
- [ ] System architecture diagram included
- [ ] Both queries explained with example data
- [ ] Scalability section present

### Part C — Deployment Audit

- [ ] Frontend deployed on Vercel with live URL
- [ ] Backend deployed on Render with live URL
- [ ] MongoDB Atlas cluster running
- [ ] Environment variables set on Render (not committed to GitHub)
- [ ] Environment variables set on Vercel
- [ ] Live URL works and is not localhost
- [ ] Login and signup work on live URL
- [ ] Adding/deleting expenses works on live URL
- [ ] Trends page loads on live URL

### Part D — Handwritten Audit

- [ ] All 5 questions answered
- [ ] System flow diagram drawn (Q1)
- [ ] API route explained step by step (Q2)
- [ ] Database relationship explained (Q3)
- [ ] Core logic traced with example (Q4)
- [ ] Security vulnerability identified with fix (Q5)
- [ ] Answers reflect actual implementation (not generic)

### Part E — Defense Readiness Audit

- [ ] You can explain what every route does
- [ ] You can explain the aggregation pipeline
- [ ] You can explain why referencing was used over embedding
- [ ] You can explain how JWT works in the app
- [ ] You can trace a full request from React to MongoDB and back
- [ ] You can explain the trend calculation logic step by step

---

### HUMANISATION AUDIT

The agent checks every file against these rules:

- [ ] At least one sloppy/short variable name per file
- [ ] No JSDoc or block documentation comments anywhere
- [ ] Less than 10% of lines have comments
- [ ] At least 2-3 console.log statements left in backend
- [ ] At least one place with inconsistent indentation (not catastrophic, just slightly off)
- [ ] At least one "could be a function but isn't" inline logic per page component
- [ ] No perfectly named handlers like `handleFormSubmission` — all names are shortened
- [ ] No external UI libraries — pure CSS
- [ ] Font is NOT Inter/Roboto/Arial/system-ui
- [ ] Color scheme is NOT purple gradient on white
- [ ] No glassmorphism effects
- [ ] No excessive box shadows on every element
- [ ] At least one instance of copy-paste code that could have been reused
- [ ] CSS has at least 3 hardcoded hex values that could have been variables
- [ ] At least one `// todo` or `// fix` comment in backend
- [ ] No emojis anywhere in the UI
- [ ] Form error handling is basic — not a polished toast notification system
- [ ] Tables and lists look functional, not Dribbble-portfolio level

---

## NOTES FOR THE AGENT

- All concepts (components, state, props, useState, useEffect, routing, REST, middleware, Express) are from the course notes provided. Do not use anything outside the course scope.
- No Axios — use native fetch
- No Redux — use useState
- No TypeScript — plain JavaScript
- No component libraries (Material UI, Ant Design, Chakra, etc.)
- No Tailwind
- The trend analysis logic MUST be visible on the UI — not just stored in DB. If it is not visible the assignment fails Part A Core Logic (15 marks).
- JWT expiry should be set to '7d' for development convenience
- All API errors should return JSON with an `error` field
- CORS must be enabled on backend for the Vercel frontend URL — since the exact URL isn't known until deployment, set CORS origin to `process.env.FRONTEND_URL` env variable on Render. During development use `http://localhost:3000`. Agent must add FRONTEND_URL to the Render environment variables list in Pause Point 2 instructions.
- Add FRONTEND_URL as an additional env variable on Render, value = the Vercel URL from Pause Point 3. Agent must remind user to go back to Render after Pause Point 3 and update this variable then redeploy.
- .gitignore must include node_modules and .env

---

*Plan prepared based on: Assignment 3 brief + Full-Stack Web Notes (FAST NUCES 2025 Edition)*
*Roll No: 23i-5503 | Decoded: Expense Management + Trend Analysis + Basic (1 collection)*
