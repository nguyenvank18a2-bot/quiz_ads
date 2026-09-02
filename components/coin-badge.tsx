import { CircleDollarSign } from "lucide-react";
export function CoinBadge({balance}:{balance:number}){return <span className="inline-flex h-8 items-center gap-1 rounded-full bg-[#edf1ff] px-3 font-bold text-[#e2aa00]"><span>{balance}</span><CircleDollarSign size={17} fill="#ffd229" color="#fff" aria-label="icon"/></span>}
