"use client";
import type { User } from "@supabase/supabase-js";
import { createContext,useCallback,useContext,useEffect,useMemo,useState } from "react";
import { createClient,isSupabaseConfigured } from "@/lib/supabase/client";
import type { Profile,Role } from "@/lib/types";
type AuthContextValue={user:User|null;profile:Profile|null;role:Role|null;loading:boolean;configured:boolean;refreshProfile:()=>Promise<void>};
const AuthContext=createContext<AuthContextValue>({user:null,profile:null,role:null,loading:true,configured:false,refreshProfile:async()=>{}});
export function AuthProvider({children}:{children:React.ReactNode}){const configured=isSupabaseConfigured();const supabase=useMemo(()=>createClient(),[]);const[user,setUser]=useState<User|null>(null);const[profile,setProfile]=useState<Profile|null>(null);const[loading,setLoading]=useState(configured);
 const loadProfile=useCallback(async(currentUser:User|null)=>{if(!supabase||!currentUser){setProfile(null);return}const{data}=await supabase.from("profiles").select("*").eq("id",currentUser.id).maybeSingle();setProfile((data as Profile|null)??null)},[supabase]);
 async function refreshProfile(){await loadProfile(user)}
 useEffect(()=>{if(!supabase)return;let active=true;supabase.auth.getUser().then(async({data})=>{if(!active)return;setUser(data.user);await loadProfile(data.user);if(active)setLoading(false)});const{data}=supabase.auth.onAuthStateChange((_event,session)=>{const nextUser=session?.user??null;setUser(nextUser);window.setTimeout(async()=>{await loadProfile(nextUser);if(active)setLoading(false)},0)});return()=>{active=false;data.subscription.unsubscribe()}},[loadProfile,supabase]);return <AuthContext.Provider value={{user,profile,role:profile?.role??null,loading,configured,refreshProfile}}>{children}</AuthContext.Provider>}
export function useAuth(){return useContext(AuthContext)}
