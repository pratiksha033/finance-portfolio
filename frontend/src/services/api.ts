import axios from "axios"

export const api = axios.create({
  baseURL: "https://finance-portfolio-j579.onrender.com"
})

export const fetchPortfolio = () =>
  api.get("/portfolio")
