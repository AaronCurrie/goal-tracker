"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import style from "../forms.module.css";

export default function LoginForm() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error , setError] = useState<any | null>(null);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setIsSubmitting(true);
    if(!email) {
        setMsg("Email and password are required");
        setIsSubmitting(false);
        setError({email: true})
    }
    if(!password) {
        setMsg("Email and password are required");
        setIsSubmitting(false);
        setError((prevError: any) => ({...prevError, password: true}))
    }
    if(!email || !password) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMsg(error.message);
      setIsSubmitting(false);
      return;
    }
    router.push("/");
  }

  useEffect(() => {
    if(email) {
        setError((prevError: any) => ({...prevError, email: false}))
    }
    if(password) {
        setError((prevError: any) => ({...prevError, password: false}))
    }
    setMsg(null);
  }, [email, password])


    return (
    <form className={style.form} onSubmit={signIn}>
        <div className={style.header}>
            <h1>Login</h1>
        </div>
      <div className={style.field}>
        <label htmlFor="email" className={style.label}>Email</label>
        <input
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${style.input} ${error?.email ? style.error : ""}`}
        />
      </div>

    <div className={style.field}>
        <label htmlFor="password" className={style.label}>Password</label>
        <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${style.input} ${error?.password ? style.error : ""}`}
        />
    </div>
    <div>
        <button className={style.submitButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
    </div>

      {msg && <p className={style.error}>{msg}</p>}
      <br />
      <p className={style.label}>Don't have an account? <a className={style.link} href="/signup">SIGN UP</a></p>
    </form>
  );
}