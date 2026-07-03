import Image from "next/image";
import { createClient } from '@/lib/supabase/server'

export default function Home() {
  return (
    <h1 className="text-5xl uppercase h-screen flex items-center">Welcome to my blog app</h1>
  );
}
