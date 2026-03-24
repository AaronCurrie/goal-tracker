"use client";

import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "../forms.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

type FormErrors = {
  name?: string;
  email?: string;
  confirmEmail?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 12) {
    errors.push("Password must be at least 12 characters.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must include at least one number.");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must include at least one special character.");
  }

  return errors;
}

export default function Signup() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [msg, setMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRules = useMemo(() => validatePassword(password), [password]);

  function validateForm(): FormErrors {
    const nextErrors: FormErrors = {};

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedConfirmEmail = confirmEmail.trim().toLowerCase();

    if (!trimmedName) {
      nextErrors.name = "Display name is required.";
    } else if (trimmedName.length < 2) {
      nextErrors.name = "Display name must be at least 2 characters.";
    } else if (trimmedName.length > 50) {
      nextErrors.name = "Display name must be 50 characters or fewer.";
    }

    if (!normalizedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!normalizedConfirmEmail) {
      nextErrors.confirmEmail = "Please confirm your email.";
    } else if (normalizedEmail !== normalizedConfirmEmail) {
      nextErrors.confirmEmail = "Email addresses do not match.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else {
      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        nextErrors.password = passwordErrors[0];
      }
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();

      const { error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            display_name: trimmedName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setErrors({
          form: "Unable to create account. Check your details or try again.",
        });
        return;
      }

      setMsg("Check your email to confirm your account.");
      router.push("/auth/check-email");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
    <Link href={'/login'}><FontAwesomeIcon size='2x' icon={faCircleArrowLeft} /></Link>

    <div className={styles.header}>
        <h1 className={styles.title}>Sign Up</h1>
    </div>


    <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Display name</label>
        <input
            id="name"
            name="name"
            autoComplete="nickname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
    </div>

    <div className={styles.field}>
      <label htmlFor="email" className={styles.label}>Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
    </div>

    <div className={styles.field}>
      <label htmlFor="confirmEmail" className={styles.label}>Confirm Email</label>
      <input
        id="confirmEmail"
        name="confirmEmail"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
        className={styles.input}
      />
      {errors.confirmEmail && <p className={styles.error}>{errors.confirmEmail}</p>}
    </div>

    <div className={styles.field}>
      <label htmlFor="password" className={styles.label}>Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>At least 12 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
        </ul>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>



      <div className={styles.field}>
        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
      </div>

      <div>
        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </div>

      {errors.form && <p className={styles.error}>{errors.form}</p>}
      {msg && <p className={styles.error}>{msg}</p>}
    </form>
  );
}