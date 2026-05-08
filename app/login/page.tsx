"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        background: "#13131a",
        border: "0.5px solid #2a2a3a",
        borderRadius: "16px",
        padding: "2.5rem",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
          <div style={{
            width: "36px", height: "36px", background: "#534AB7",
            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ color: "white", fontSize: "18px" }}>⊞</span>
          </div>
          <span style={{ fontSize: "18px", color: "#e8e8f0", fontWeight: 600 }}>
            ProjectFlow
          </span>
        </div>

        <h1 style={{ fontSize: "24px", color: "#e8e8f0", marginBottom: "6px" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "13px", color: "#6b6b80", marginBottom: "2rem" }}>
          Sign in to manage your projects and tasks
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "12px", color: "#9090a8", marginBottom: "6px" }}>
              EMAIL
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                background: "#0d0d14",
                border: "0.5px solid #2a2a3a",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "14px",
                color: "#e8e8f0",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "12px", color: "#9090a8", marginBottom: "6px" }}>
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                background: "#0d0d14",
                border: "0.5px solid #2a2a3a",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "14px",
                color: "#e8e8f0",
                outline: "none",
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <p style={{ color: "#E24B4A", fontSize: "13px", marginBottom: "1rem", textAlign: "center" }}>
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#3a3a50" : "#534AB7",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}