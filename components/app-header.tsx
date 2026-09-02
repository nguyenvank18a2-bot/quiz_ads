import Link from "next/link";
import { UserRound } from "lucide-react";
import { CoinBadge } from "@/components/coin-badge";
export function AppHeader({balance}:{balance:number}){return <header className="border-b border-[#edf0fa] bg-[#f1f3ff]"><div className="content-width flex h-14 items-center justify-between"><Link href="/" className="font-bold text-[var(--primary)]">Câu Đố Vui</Link><div className="flex items-center gap-3"><CoinBadge balance={balance}/><Link href="/account" aria-label="Mở tài khoản" className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-[#dce4ff] text-[var(--primary)] shadow"><UserRound size={20}/></Link></div></div></header>}
