import { createClient } from "@supabase/supabase-js";

const Supa_Url = "https://hdxpvwaojkbmgzmlbqgd.supabase.co";
const Supa_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeHB2d2FvamtibWd6bWxicWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MjgyNjEsImV4cCI6MjA2ODAwNDI2MX0.-_53pl7SBxsx2nCsFjvKZo63SRTZLAW-ePGRz-rzJrs";
const supabase = createClient(Supa_Url, Supa_Key);

async function GetToken(Token) {
  const { data, error } = await supabase
    .from("Token")
    .select("Token, is_valid")   // 👈 seleciona as 2 colunas
    .eq("Token", Token)          // 👈 faz o filtro onde Token = Token passado
    .single();                   // 👈 espera 1 resultado (erro se não achar)

  if (error) {
    console.log(error);
    return null;
  }

  return data;  // { Token: ..., is_valid: ... }
}


export default async function handler(req, res) {
  const { Token } = req.query;

  const response = await GetToken(Token);

  if (!response) {
    return res.status(404).json({ error: "Token não encontrado" });
  }

  return res.status(200).json(response);
}
