import { LoaderCircle } from "lucide-react";
export function LoadingScreen({text="Đang tải..."}:{text?:string}){return <div className="flex min-h-screen items-center justify-center gap-3 text-[var(--muted)]"><LoaderCircle className="animate-spin" aria-hidden="true"/><span>{text}</span></div>}
