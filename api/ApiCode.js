// api.js
import express from "express"
import { createClient } from "@supabase/supabase-js"
import { createSession, getSession, getAllSessions } from "./sessions.js"

const app = express()
app.use(express.json()) // Permite body JSON

// Configuração do Supabase
const Supa_Url = "https://hdxpvwaojkbmgzmlbqgd.supabase.co"
const Supa_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeHB2d2FvamtibWd6bWxicWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MjgyNjEsImV4cCI6MjA2ODAwNDI2MX0.-_53pl7SBxsx2nCsFjvKZo63SRTZLAW-ePGRz-rzJrs"
const supabase = createClient(Supa_Url, Supa_Key)

// Valida Token no Supabase
async function GetToken(Token) {
  console.log("[GetToken] Verificando:", Token)
  const { data, error } = await supabase
    .from("Tokens")
    .select("is_valid")
    .eq("Token", Token)
    .single()

  if (error) {
    console.log("[GetToken] Erro:", error)
    return null
  }

  console.log("[GetToken] Resultado:", data)
  return data
}

// ✅ POST: Cria nova sessão
app.post("/create-session", async (req, res) => {
  const { Token, SessionId } = req.body

  if (!Token || !SessionId) {
    return res.status(400).json({ error: "Body deve ter { Token, SessionId }" })
  }

  const tokenData = await GetToken(Token)

  if (!tokenData || !tokenData.is_valid) {
    return res.status(401).json({ error: "Token inválido!" })
  }

  const existing = getSession(SessionId)
  if (existing) {
    return res.status(200).json({ message: `Sessão ${SessionId} já existe.` })
  }

  await createSession(SessionId)

  return res.status(200).json({ message: `Sessão ${SessionId} criada!`, SessionId })
})

// ✅ GET: Lista sessões ativas
app.get("/sessions", (req, res) => {
  res.status(200).json({ activeSessions: getAllSessions() })
})

// Porta local
const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`)
})
