"use client";
import {BarChart3,FolderTree,HelpCircle,LogOut,Menu,Settings,Users,X} from "lucide-react";
import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import {useMemo,useState} from "react";
import {createClient} from "@/lib/supabase/client";

const links=[
 {href:"/admin",label:"Dashboard",icon:BarChart3},
 {href:"/admin/questions",label:"Questions",icon:HelpCircle},
 {href:"/admin/categories",label:"Categories",icon:FolderTree},
 {href:"/admin/users",label:"Users",icon:Users},
 {href:"/admin/settings",label:"Settings",icon:Settings},
];

export function AdminShell({children,title,description}:{children:React.ReactNode;title:string;description:string}){const pathname=usePathname();const router=useRouter();const supabase=useMemo(()=>createClient(),[]);const[open,setOpen]=useState(false);async function logout(){await supabase?.auth.signOut();router.replace("/login")}
 return <div className="min-h-screen bg-[#f7f8fc] lg:flex"><aside className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#25264f] text-white transition-transform lg:static lg:translate-x-0 ${open?"translate-x-0":"-translate-x-full"}`}><div className="flex h-16 items-center justify-between border-b border-white/10 px-5"><Link href="/admin" className="text-lg font-bold">Câu Đố Vui <span className="text-[#aeb5ff]">Admin</span></Link><button onClick={()=>setOpen(false)} className="p-1 lg:hidden" aria-label="Đóng menu"><X/></button></div><nav className="flex-1 space-y-1 p-3">{links.map(({href,label,icon:Icon})=>{const active=href==="/admin"?pathname===href:pathname.startsWith(href);return <Link key={href} href={href} onClick={()=>setOpen(false)} className={`flex min-h-11 items-center gap-3 rounded-lg px-3 font-semibold ${active?"bg-[#6264e8]":"text-[#d4d6ef] hover:bg-white/10"}`}><Icon size={19}/>{label}</Link>})}</nav><button onClick={logout} className="m-3 flex min-h-11 items-center gap-3 rounded-lg px-3 font-semibold text-[#ffd1d1] hover:bg-white/10"><LogOut size={19}/>Logout</button></aside>{open&&<button className="fixed inset-0 z-20 bg-black/35 lg:hidden" onClick={()=>setOpen(false)} aria-label="Đóng menu"/>}<div className="min-w-0 flex-1"><header className="flex min-h-16 items-center gap-3 border-b border-[#e3e5ef] bg-white px-4 sm:px-7"><button onClick={()=>setOpen(true)} className="p-2 lg:hidden" aria-label="Mở menu"><Menu/></button><div><h1 className="text-xl font-bold">{title}</h1><p className="text-sm text-[var(--muted)]">{description}</p></div></header><main className="p-4 sm:p-7">{children}</main></div></div>}

export function AdminNotice({message,type="success"}:{message:string;type?:"success"|"error"}){if(!message)return null;return <p role={type==="error"?"alert":"status"} className={`mb-4 rounded-lg px-4 py-3 text-sm ${type==="error"?"bg-red-50 text-red-700":"bg-green-50 text-green-700"}`}>{message}</p>}
export function EmptyState({text}:{text:string}){return <div className="rounded-xl border border-dashed border-[#cfd2e3] bg-white px-5 py-12 text-center text-[var(--muted)]">{text}</div>}
