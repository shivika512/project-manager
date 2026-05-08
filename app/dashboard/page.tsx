"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0f",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#e8e8f0", fontFamily: "sans-serif"
      }}>
        Loading...
      </div>
    );
  }

  const isAdmin = (session?.user as any)?.role === "Admin";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "sans-serif", color: "#e8e8f0" }}>
      
      {/* Navbar */}
      <div style={{
        background: "#13131a", borderBottom: "0.5px solid #2a2a3a",
        padding: "0 2rem", height: "56px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "28px", height: "28px", background: "#534AB7",
            borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ color: "white", fontSize: "14px" }}>⊞</span>
          </div>
          <span style={{ fontSize: "16px", fontWeight: 600 }}>ProjectFlow</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{
            background: isAdmin ? "#534AB720" : "#1D9E7520",
            color: isAdmin ? "#AFA9EC" : "#1D9E75",
            fontSize: "11px", padding: "3px 10px", borderRadius: "20px"
          }}>
            {isAdmin ? "Admin" : "Member"}
          </span>
          <span style={{ fontSize: "13px", color: "#6b6b80" }}>{session?.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{
              background: "transparent", border: "0.5px solid #2a2a3a",
              borderRadius: "6px", padding: "6px 12px", color: "#6b6b80",
              fontSize: "12px", cursor: "pointer"
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Welcome */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "4px" }}>
            Welcome back, {session?.user?.name || session?.user?.email} 👋
          </h1>
          <p style={{ color: "#6b6b80", fontSize: "14px" }}>
            {isAdmin ? "You have full admin access" : "Viewing your assigned tasks"}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "2rem" }}>
          {[
            { label: "Total Projects", value: "3", color: "#534AB7" },
            { label: "Tasks In Progress", value: "5", color: "#EF9F27" },
            { label: "Completed", value: "8", color: "#1D9E75" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "#13131a", border: "0.5px solid #2a2a3a",
              borderRadius: "12px", padding: "1.2rem"
            }}>
              <p style={{ fontSize: "12px", color: "#6b6b80", marginBottom: "8px" }}>{stat.label}</p>
              <p style={{ fontSize: "28px", fontWeight: 600, color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div style={{
          background: "#13131a", border: "0.5px solid #2a2a3a",
          borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600 }}>
              {isAdmin ? "All Tasks" : "My Tasks"}
            </h2>
            {isAdmin && (
              <button style={{
                background: "#534AB7", border: "none", borderRadius: "6px",
                padding: "6px 14px", color: "white", fontSize: "12px", cursor: "pointer"
              }}>
                + New Task
              </button>
            )}
          </div>

          {/* Task list */}
          {[
            { title: "Design login page", status: "DONE", assignee: "john" },
            { title: "Setup MongoDB models", status: "IN_PROGRESS", assignee: "alex" },
            { title: "Build dashboard UI", status: "IN_PROGRESS", assignee: "john" },
            { title: "Deploy to Railway", status: "TODO", assignee: "alex" },
          ].map((task, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 0", borderBottom: "0.5px solid #2a2a3a"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "16px" }}>
                  {task.status === "DONE" ? "✅" : task.status === "IN_PROGRESS" ? "🔄" : "⬜"}
                </span>
                <span style={{ fontSize: "14px" }}>{task.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "12px", color: "#6b6b80" }}>{task.assignee}</span>
                <span style={{
                  fontSize: "11px", padding: "3px 8px", borderRadius: "4px",
                  background: task.status === "DONE" ? "#1D9E7520" : task.status === "IN_PROGRESS" ? "#EF9F2720" : "#2a2a3a",
                  color: task.status === "DONE" ? "#1D9E75" : task.status === "IN_PROGRESS" ? "#EF9F27" : "#6b6b80",
                }}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Admin only section */}
        {isAdmin && (
          <div style={{
            background: "#13131a", border: "0.5px solid #534AB730",
            borderRadius: "12px", padding: "1.5rem"
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "1rem", color: "#AFA9EC" }}>
              Admin Panel
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {["Manage Users", "Manage Projects", "View All Tasks", "Settings"].map((item) => (
                <button key={item} style={{
                  background: "#0d0d14", border: "0.5px solid #2a2a3a",
                  borderRadius: "8px", padding: "12px", color: "#9090a8",
                  fontSize: "13px", cursor: "pointer", textAlign: "left"
                }}>
                  {item} →
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}