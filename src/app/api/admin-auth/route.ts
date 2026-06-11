import { NextResponse } from "next/server";

// Validação da senha do painel admin no servidor.
// A senha fica em ADMIN_PASSWORD (sem prefixo NEXT_PUBLIC_), então nunca vai pro bundle do cliente.
export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD não configurada no servidor." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // corpo inválido → trata como senha vazia
  }

  if (password && password === expected) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Senha incorreta." }, { status: 401 });
}
