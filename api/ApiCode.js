 import { createClient } from "@supabase/supabase-js";

const Supa_Url = "https://hdxpvwaojkbmgzmlbqgd.supabase.co";
const Supa_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeHB2d2FvamtibWd6bWxicWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MjgyNjEsImV4cCI6MjA2ODAwNDI2MX0.-_53pl7SBxsx2nCsFjvKZo63SRTZLAW-ePGRz-rzJrs";
const supabase = createClient(Supa_Url, Supa_Key);

async function GetToken(Token) {
  console.log("[GetToken] Token recebido para busca:", Token);

  const { data, error } = await supabase
    .from("Tokens")
    .select("is_valid", "type")
    .eq("Token", Token)
    .single();

  if (error) {
    console.log("[GetToken] Erro ao buscar token:", error);
    return null;
  }

  console.log("[GetToken] Dados encontrados:", data);
  return data;
}

export default async function handler(req, res) {
  const { Token } = req.query;
  return res.status(200).json(await GetToken(Token));
}
//git status
//git add .
//git commit -m "Colocando type"
//git push