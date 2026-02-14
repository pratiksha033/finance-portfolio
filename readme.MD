 ## 📊 Finance Portfolio Dashboard

A full-stack Finance Portfolio Dashboard that reads portfolio data from Excel, fetches live stock prices (CMP), retrieves fundamental data (P/E & Earnings), and displays an interactive dashboard with charts, filtering, sorting, and pagination.



## 🏗 Tech Stack
Frontend

Next.js 14

React 18

TypeScript

Tailwind CSS

Recharts (Charts)

Axios

Backend

Node.js

Express.js

XLSX (Excel parsing)

Axios

Node Cache

CORS

📌 Features
📥 Excel Integration

Reads portfolio data from excel.xlsx

Extracts:

Stock Name

Symbol

Purchase Price

Quantity

Sector

📈 Live Market Data

Fetches Current Market Price (CMP) from Yahoo Finance (unofficial API handling).

Fetches:

P/E Ratio

Latest Earnings
(Using scraping/unofficial API approach)

⚡ Backend Optimizations

In-memory caching using node-cache

Auto refresh every 15 seconds

Proper CORS configuration for production

📊 Dashboard UI

Summary Cards (Total Investment, Current Value, P/L)

Sector Allocation Pie Chart

Profit/Loss Bar Chart

Search functionality

Sector filter dropdown

Column sorting

Pagination

Responsive design

Dark/Light theme support

📂 Project Structure
finance-portfolio/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── server.js
│   └── excel.xlsx
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│
└── README.md

🛠 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/finance-portfolio.git

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Backend runs at:

http://localhost:5000

3️⃣ Frontend Setup

Create .env.local inside frontend folder:

NEXT_PUBLIC_API_URL=http://localhost:5000/api


Then run:

cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:3000

🔍 Challenges Faced
1️⃣ Yahoo Finance API

Yahoo does not provide an official public API.

Faced 401 errors and blocking issues.

Implemented proper headers and fallback handling.

2️⃣ Google Finance Data

No official API available.

Required scraping/unofficial handling.

Implemented error-safe fallback logic.

3️⃣ Excel Parsing

Excel sheet had formatted rows and sector headers.

Needed to parse raw rows and dynamically detect sector rows.

4️⃣ Pagination Logic

Pagination initially disappeared when filters changed.

Fixed by resetting page on filter update.

5️⃣ Deployment Issues

CORS errors between Render and Vercel.

Fixed API route mismatch (/api/portfolio)

Corrected environment variable usage.

Resolved 404 caused by missing /api prefix.

📌 API Endpoint
GET /api/portfolio


Returns structured JSON:

[
  {
    name,
    symbol,
    purchasePrice,
    qty,
    sector,
    cmp,
    pe,
    earnings,
    presentValue,
    gainLoss
  }
]

🎯 Key Learnings

Handling unofficial financial APIs

Production CORS configuration

Environment variable management in Vercel

Real-world deployment debugging

Data transformation from Excel to structured JSON

🎥 Demo Video

Loom walkthrough explaining architecture, implementation decisions, and challenges.

(Attach Loom link here)

👩‍💻 Author

Pratiksha Parihar
