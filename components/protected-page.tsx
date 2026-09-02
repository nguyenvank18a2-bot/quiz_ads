"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { LoadingScreen } from "@/components/loading-screen";
import type { Role } from "@/lib/types";
export function ProtectedPage({children,requiredRole="user"}:{children:React.ReactNode;requiredRole?:Role}){const{user,role,profile,loading,configured}=useAuth();const router=useRouter();useEffect(()=>{if(loading||!configured)return;if(!user){router.replace("/login");return}if(profile?.is_banned){router.replace("/login");return}if(requiredRole==="admin"&&role!=="admin")router.replace("/");if(requiredRole==="user"&&role==="admin")router.replace("/admin")},[configured,loading,profile?.is_banned,requiredRole,role,router,user]);if(!configured)return <main className="flex min-h-screen items-center justify-center p-6"><div className="card-shadow max-w-md rounded-2xl border border-[var(--border)] bg-white p-7 text-center"><h1 className="text-xl font-bold">Chưa kết nối Supabase</h1><p className="mt-3 leading-6 text-[var(--muted)]">Hãy tạo tệp <code>.env.local</code> theo <code>.env.example</code>, rồi khởi động lại website.</p></div></main>;if(loading||!user||!role||profile?.is_banned||role!==requiredRole)return <LoadingScreen text="Đang kiểm tra quyền truy cập..."/>;return children}
