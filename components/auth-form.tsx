"use client";

import { ArrowRight, LockKeyhole, Mail, Puzzle, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = { mode: "login" | "register" };

function friendlyAuthError(message: string) {
  if (message.includes("Invalid login credentials")) return "Email hoặc mật khẩu chưa đúng.";
  if (message.includes("already registered")) return "Email này đã được đăng ký.";
  if (message.includes("Password should be")) return "Mật khẩu cần có ít nhất 6 ký tự.";
  return "Không thể thực hiện lúc này. Vui lòng thử lại.";
}

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";
  const router = useRouter();
  const { user, loading, configured } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { role } = useAuth();
  useEffect(() => { if (!loading && user && role) router.replace(role === "admin" ? "/admin" : "/"); }, [loading, role, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    if (!configured) { setError("Website chưa được kết nối Supabase."); return; }
    const authEmail = email.trim();
    if (!authEmail || !/^\S+@\S+\.\S+$/.test(authEmail)) { setError("Vui lòng nhập email hợp lệ."); return; }
    if (!password) { setError("Vui lòng nhập mật khẩu."); return; }
    if (isRegister && !displayName.trim()) { setError("Vui lòng nhập tên hiển thị."); return; }
    if (isRegister && password !== confirmPassword) { setError("Hai mật khẩu chưa khớp nhau."); return; }

    const supabase = createClient(); if (!supabase) return;
    setSubmitting(true);
    if (isRegister) {
      const { data, error: authError } = await supabase.auth.signUp({
        email: authEmail, password, options: { data: { display_name: displayName.trim() } },
      });
      if (authError) setError(friendlyAuthError(authError.message));
      else if (!data.session) setNotice("Đăng ký thành công! Hãy kiểm tra email để xác nhận tài khoản.");
      else router.replace("/");
    } else {
      const { error: authError } = await supabase.auth.signInWithPassword({ email: authEmail, password });
      if (authError)setError(friendlyAuthError(authError.message));else{const{data:current}=await supabase.auth.getUser();const{data:p}=await supabase.from("profiles").select("role,is_banned").eq("id",current.user?.id??"").maybeSingle();if(p?.is_banned){await supabase.auth.signOut();setError("Tài khoản đã bị khóa.")}else router.replace(p?.role==="admin"?"/admin":"/")}
    }
    setSubmitting(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-5">
      <section className="card-shadow w-full max-w-[412px] overflow-hidden rounded-xl border border-[#d9e3ff] bg-white" aria-labelledby="auth-title">
        <header className="flex h-[92px] flex-col items-center justify-center bg-gradient-to-r from-[#4656d5] to-[#276c87] text-white">
          {!isRegister && <Puzzle className="mb-1" fill="currentColor" aria-hidden="true" />}
          <p className="text-[28px] font-bold">Câu Đố Vui</p>
        </header>
        <div className="px-7 py-7 sm:px-8">
          <div className="text-center">
            <h1 id="auth-title" className="text-[22px] font-bold">{isRegister ? "Tạo tài khoản mới" : "Chào mừng trở lại!"}</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">{isRegister ? "Bắt đầu hành trình giải đố ngay hôm nay!" : "Đăng nhập để tiếp tục chinh phục thử thách."}</p>
          </div>

          <form className="mt-7 space-y-3" onSubmit={handleSubmit} noValidate>
            {isRegister && <Field label="Tên hiển thị" icon={<UserRound size={18}/>} type="text" value={displayName} onChange={setDisplayName} placeholder="Nhập tên của bạn" autoComplete="name" />}
            <Field label="Email" icon={<Mail size={18}/>} type="email" value={email} onChange={setEmail} placeholder="Nhập địa chỉ email" autoComplete="email" />
            <Field label="Mật khẩu" icon={<LockKeyhole size={18}/>} type="password" value={password} onChange={setPassword} placeholder={isRegister ? "Tạo mật khẩu" : "••••••••"} autoComplete={isRegister ? "new-password" : "current-password"} />
            {isRegister && <Field label="Xác nhận mật khẩu" icon={<LockKeyhole size={18}/>} type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Nhập lại mật khẩu" autoComplete="new-password" />}
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
            {notice && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700" role="status">{notice}</p>}
            <button className="primary-button mt-2 w-full" disabled={submitting} type="submit">{submitting ? "Đang xử lý..." : isRegister ? "Đăng ký" : "Đăng nhập"}<ArrowRight size={16} aria-hidden="true" /></button>
          </form>

          <p className="mt-5 text-center text-sm">{isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"} <Link className="font-semibold text-[var(--primary)] underline" href={isRegister ? "/login" : "/register"}>{isRegister ? "Đăng nhập" : "Đăng ký ngay"}</Link></p>
        </div>
      </section>
    </main>
  );
}

function Field({ label, icon, type, value, onChange, placeholder, autoComplete }: { label:string; icon:React.ReactNode; type:string; value:string; onChange:(value:string)=>void; placeholder:string; autoComplete:string }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return <div><label className="mb-1 block text-xs font-bold" htmlFor={id}>{label}</label><div className="flex h-11 items-center rounded-md border border-[#c9cada] bg-white px-3 focus-within:border-[var(--primary)]"><span className="mr-2 text-[#777c94]" aria-hidden="true">{icon}</span><input id={id} className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-[#9093a7]" type={type} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete}/></div></div>;
}
