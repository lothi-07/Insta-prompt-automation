import { useState, useEffect, useCallback } from "react";

// ─── API CONFIG ───────────────────────────────────────────────────────────────
const API_BASE = "https://insta-prompt-backend.onrender.com";

const api = {
  get: (path) => fetch(`${API_BASE}${path}`).then((r) => r.json()),
  post: (path, body) =>
    fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  put: (path, body) =>
    fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  delete: (path) => fetch(`${API_BASE}${path}`, { method: "DELETE" }).then((r) => r.json()),
};

// ─── ICONS (inline SVG) ────────────────────────────────────────────────────────
const Icon = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Add: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  Reels: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  ),
  Logs: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Sun: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  ),
  Eye: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  Activity: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          padding: "12px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500,
          background: t.type === "success" ? "#22c55e" : t.type === "error" ? "#ef4444" : "#6366f1",
          color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          animation: "slideIn 0.2s ease", display: "flex", alignItems: "center", gap: 10,
          cursor: "pointer", minWidth: 240
        }} onClick={() => removeToast(t.id)}>
          {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"} {t.message}
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);
  const removeToast = useCallback((id) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  return { toasts, addToast, removeToast };
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children, dark }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16
    }} onClick={onClose}>
      <div style={{
        background: dark ? "#1e1e2e" : "#fff", borderRadius: 16, padding: 32,
        maxWidth: 580, width: "100%", maxHeight: "80vh", overflow: "auto",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        border: `1px solid ${dark ? "#2a2a3e" : "#e5e7eb"}`
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontWeight: 700, color: dark ? "#f1f5f9" : "#0f172a", fontSize: 18 }}>{title}</h3>
          <button onClick={onClose} style={{
            background: dark ? "#2a2a3e" : "#f1f5f9", border: "none", borderRadius: 8,
            padding: 8, cursor: "pointer", color: dark ? "#94a3b8" : "#64748b", display: "flex"
          }}><Icon.Close /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, accent, icon, dark }) {
  return (
    <div style={{
      background: dark ? "#1e1e2e" : "#fff", borderRadius: 14, padding: "22px 26px",
      border: `1px solid ${dark ? "#2a2a3e" : "#e5e7eb"}`,
      display: "flex", alignItems: "center", gap: 18,
      boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.06)"
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${accent}18`, display: "flex", alignItems: "center",
        justifyContent: "center", color: accent, flexShrink: 0, fontSize: 22
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, color: dark ? "#64748b" : "#94a3b8", marginBottom: 4, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: dark ? "#f1f5f9" : "#0f172a", lineHeight: 1 }}>{value}</div>
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function DashboardPage({ dark, addToast }) {
  const [stats, setStats] = useState({ total_reels: 0, total_prompts: 0, total_dms_sent: 0 });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/reels/stats"), api.get("/logs")])
      .then(([s, l]) => { setStats(s); setLogs(l.slice(0, 8)); })
      .catch(() => addToast("Could not connect to backend", "error"))
      .finally(() => setLoading(false));
  }, []);

  const c = dark ? "#f1f5f9" : "#0f172a";
  const sub = dark ? "#64748b" : "#94a3b8";
  const border = dark ? "#2a2a3e" : "#e5e7eb";

  return (
    <div style={{ padding: "0 2px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: c, margin: 0 }}>Dashboard</h1>
        <p style={{ color: sub, marginTop: 6, fontSize: 14 }}>Instagram Prompt Automation overview</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Reels" value={loading ? "—" : stats.total_reels} accent="#6366f1" icon="🎬" dark={dark} />
        <StatCard label="Total Prompts" value={loading ? "—" : stats.total_prompts} accent="#8b5cf6" icon="📝" dark={dark} />
        <StatCard label="DMs Sent" value={loading ? "—" : stats.total_dms_sent} accent="#06b6d4" icon="💬" dark={dark} />
        <StatCard label="Active Account" value="1" accent="#22c55e" icon="✅" dark={dark} />
      </div>

      <div style={{
        background: dark ? "#1e1e2e" : "#fff", borderRadius: 14, border: `1px solid ${border}`,
        overflow: "hidden", boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon.Activity /><span style={{ fontWeight: 700, color: c, fontSize: 15 }}>Recent Activity</span>
        </div>
        {logs.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: sub }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div style={{ fontWeight: 600 }}>No activity yet</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>DM logs will appear here</div>
          </div>
        ) : (
          <div>
            {logs.map((l, i) => (
              <div key={l.id} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "14px 24px",
                borderBottom: i < logs.length - 1 ? `1px solid ${border}` : "none"
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: "#6366f118",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0
                }}>👤</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: c, fontSize: 14 }}>@{l.instagram_username}</div>
                  <div style={{ color: sub, fontSize: 12, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    Reel: {l.reel_id} · {l.prompt_sent.substring(0, 50)}...
                  </div>
                </div>
                <div style={{ color: sub, fontSize: 12, flexShrink: 0 }}>
                  {new Date(l.sent_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AddReelPage({ dark, addToast }) {
  const [form, setForm] = useState({ reel_id: "", reel_title: "", prompt_content: "" });
  const [loading, setLoading] = useState(false);
  const c = dark ? "#f1f5f9" : "#0f172a";
  const sub = dark ? "#64748b" : "#94a3b8";
  const border = dark ? "#2a2a3e" : "#e5e7eb";
  const inputBg = dark ? "#12121c" : "#f8fafc";

  const handleSubmit = async () => {
    if (!form.reel_id.trim() || !form.reel_title.trim() || !form.prompt_content.trim()) {
      addToast("All fields are required", "error"); return;
    }
    setLoading(true);
    try {
      const res = await api.post("/reels", form);
      if (res.detail) throw new Error(res.detail);
      addToast("Reel saved successfully!", "success");
      setForm({ reel_id: "", reel_title: "", prompt_content: "" });
    } catch (e) {
      addToast(e.message || "Failed to save reel", "error");
    } finally { setLoading(false); }
  };

  const inp = {
    width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14, outline: "none",
    border: `1px solid ${border}`, background: inputBg, color: c, boxSizing: "border-box",
    transition: "border-color 0.2s", fontFamily: "inherit"
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: c, margin: 0 }}>Add Reel</h1>
        <p style={{ color: sub, marginTop: 6, fontSize: 14 }}>Upload a reel and assign a prompt to it</p>
      </div>

      <div style={{
        background: dark ? "#1e1e2e" : "#fff", borderRadius: 16,
        border: `1px solid ${border}`, padding: 32, maxWidth: 620,
        boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "Reel ID", key: "reel_id", placeholder: "e.g. ABC123XYZ", hint: "Instagram Reel unique identifier" },
            { label: "Reel Title", key: "reel_title", placeholder: "e.g. Anime Girl Prompt Reel", hint: "A descriptive name for this reel" },
          ].map(({ label, key, placeholder, hint }) => (
            <div key={key}>
              <label style={{ fontSize: 13, fontWeight: 600, color: c, display: "block", marginBottom: 6 }}>{label}</label>
              <input
                style={inp} placeholder={placeholder} value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                onBlur={(e) => e.target.style.borderColor = border}
              />
              <div style={{ fontSize: 12, color: sub, marginTop: 4 }}>{hint}</div>
            </div>
          ))}

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: c, display: "block", marginBottom: 6 }}>Prompt Content</label>
            <textarea
              rows={7} style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
              placeholder="Enter the full AI prompt that will be sent via DM when users comment 'PROMPT'..."
              value={form.prompt_content}
              onChange={(e) => setForm((p) => ({ ...p, prompt_content: e.target.value }))}
              onFocus={(e) => e.target.style.borderColor = "#6366f1"}
              onBlur={(e) => e.target.style.borderColor = border}
            />
            <div style={{ fontSize: 12, color: sub, marginTop: 4 }}>This prompt will be automatically DMed to users who comment "PROMPT"</div>
          </div>

          <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
            <button onClick={handleSubmit} disabled={loading} style={{
              flex: 1, padding: "12px 20px", background: loading ? "#6366f180" : "#6366f1",
              color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s"
            }}>
              {loading ? "Saving..." : "💾 Save Reel"}
            </button>
            <button onClick={() => setForm({ reel_id: "", reel_title: "", prompt_content: "" })} style={{
              padding: "12px 20px", background: dark ? "#2a2a3e" : "#f1f5f9",
              color: dark ? "#94a3b8" : "#64748b", border: "none", borderRadius: 10,
              fontWeight: 600, fontSize: 14, cursor: "pointer"
            }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageReelsPage({ dark, addToast }) {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promptModal, setPromptModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({ reel_title: "", prompt_content: "" });
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    api.get("/reels")
      .then(setReels)
      .catch(() => addToast("Failed to load reels", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const deleteReel = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await api.delete(`/reels/${id}`);
      addToast("Reel deleted", "success");
      load();
    } catch { addToast("Delete failed", "error"); }
  };

  const saveEdit = async () => {
    try {
      await api.put(`/reels/${editModal.id}`, editForm);
      addToast("Reel updated!", "success");
      setEditModal(null);
      load();
    } catch { addToast("Update failed", "error"); }
  };

  const c = dark ? "#f1f5f9" : "#0f172a";
  const sub = dark ? "#64748b" : "#94a3b8";
  const border = dark ? "#2a2a3e" : "#e5e7eb";
  const inputBg = dark ? "#12121c" : "#f8fafc";

  const filtered = reels.filter(r =>
    r.reel_title.toLowerCase().includes(search.toLowerCase()) ||
    r.reel_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: c, margin: 0 }}>Manage Reels</h1>
        <p style={{ color: sub, marginTop: 6, fontSize: 14 }}>{reels.length} reel{reels.length !== 1 ? "s" : ""} configured</p>
      </div>

      <div style={{
        background: dark ? "#1e1e2e" : "#fff", borderRadius: 14,
        border: `1px solid ${border}`, overflow: "hidden",
        boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${border}` }}>
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reels..."
            style={{
              padding: "9px 14px", borderRadius: 8, border: `1px solid ${border}`,
              background: inputBg, color: c, fontSize: 14, outline: "none",
              width: "100%", boxSizing: "border-box", fontFamily: "inherit"
            }}
          />
        </div>

        {loading ? (
          <div style={{ padding: 48, textAlign: "center", color: sub }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: sub }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div>
            <div style={{ fontWeight: 600 }}>No reels found</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: dark ? "#12121c" : "#f8fafc" }}>
                  {["Reel Title", "Reel ID", "Created", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 700,
                      color: sub, textTransform: "uppercase", letterSpacing: "0.05em",
                      borderBottom: `1px solid ${border}`, whiteSpace: "nowrap"
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${border}` : "none" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: c, fontSize: 14 }}>{r.reel_title}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        background: "#6366f118", color: "#6366f1", padding: "3px 8px",
                        borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: "monospace"
                      }}>{r.reel_id}</span>
                    </td>
                    <td style={{ padding: "14px 20px", color: sub, fontSize: 13 }}>
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[
                          { icon: <Icon.Eye />, label: "View", color: "#06b6d4", bg: "#06b6d418", fn: () => setPromptModal(r) },
                          { icon: <Icon.Edit />, label: "Edit", color: "#6366f1", bg: "#6366f118", fn: () => { setEditModal(r); setEditForm({ reel_title: r.reel_title, prompt_content: r.prompt_content }); } },
                          { icon: <Icon.Trash />, label: "Del", color: "#ef4444", bg: "#ef444418", fn: () => deleteReel(r.id, r.reel_title) },
                        ].map(({ icon, label, color, bg, fn }) => (
                          <button key={label} onClick={fn} title={label} style={{
                            display: "flex", alignItems: "center", gap: 5, padding: "6px 10px",
                            background: bg, color, border: "none", borderRadius: 7,
                            cursor: "pointer", fontSize: 12, fontWeight: 600
                          }}>{icon} {label}</button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Prompt Viewer Modal */}
      <Modal isOpen={!!promptModal} onClose={() => setPromptModal(null)} title={`Prompt — ${promptModal?.reel_title}`} dark={dark}>
        <div style={{ marginBottom: 12 }}>
          <span style={{
            background: "#6366f118", color: "#6366f1", padding: "4px 10px",
            borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: "monospace"
          }}>ID: {promptModal?.reel_id}</span>
        </div>
        <div style={{
          background: dark ? "#12121c" : "#f8fafc", border: `1px solid ${border}`,
          borderRadius: 10, padding: 16, fontSize: 14, lineHeight: 1.7,
          color: dark ? "#e2e8f0" : "#334155", fontFamily: "monospace", whiteSpace: "pre-wrap"
        }}>
          {promptModal?.prompt_content}
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editModal} onClose={() => setEditModal(null)} title="Edit Reel" dark={dark}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: dark ? "#f1f5f9" : "#0f172a", display: "block", marginBottom: 6 }}>Reel Title</label>
            <input
              value={editForm.reel_title}
              onChange={(e) => setEditForm(p => ({ ...p, reel_title: e.target.value }))}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`,
                background: inputBg, color: dark ? "#f1f5f9" : "#0f172a", fontSize: 14,
                outline: "none", boxSizing: "border-box", fontFamily: "inherit"
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: dark ? "#f1f5f9" : "#0f172a", display: "block", marginBottom: 6 }}>Prompt Content</label>
            <textarea
              rows={6} value={editForm.prompt_content}
              onChange={(e) => setEditForm(p => ({ ...p, prompt_content: e.target.value }))}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`,
                background: inputBg, color: dark ? "#f1f5f9" : "#0f172a", fontSize: 14,
                outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit"
              }}
            />
          </div>
          <button onClick={saveEdit} style={{
            padding: "11px 20px", background: "#6366f1", color: "#fff",
            border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer"
          }}>Save Changes</button>
        </div>
      </Modal>
    </div>
  );
}

function ActivityLogsPage({ dark, addToast }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const c = dark ? "#f1f5f9" : "#0f172a";
  const sub = dark ? "#64748b" : "#94a3b8";
  const border = dark ? "#2a2a3e" : "#e5e7eb";

  const load = () => {
    setLoading(true);
    api.get("/logs")
      .then(setLogs)
      .catch(() => addToast("Failed to load logs", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const clearLogs = async () => {
    if (!window.confirm("Clear all activity logs?")) return;
    try {
      await api.delete("/logs");
      addToast("Logs cleared", "success");
      load();
    } catch { addToast("Failed to clear logs", "error"); }
  };

  return (
    <div>
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: c, margin: 0 }}>Activity Logs</h1>
          <p style={{ color: sub, marginTop: 6, fontSize: 14 }}>{logs.length} DM event{logs.length !== 1 ? "s" : ""} logged</p>
        </div>
        <button onClick={clearLogs} style={{
          padding: "9px 16px", background: "#ef444418", color: "#ef4444",
          border: "1px solid #ef444430", borderRadius: 8, fontWeight: 600,
          fontSize: 13, cursor: "pointer"
        }}>Clear All</button>
      </div>

      <div style={{
        background: dark ? "#1e1e2e" : "#fff", borderRadius: 14,
        border: `1px solid ${border}`, overflow: "hidden",
        boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center", color: sub }}>Loading...</div>
        ) : logs.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: sub }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ fontWeight: 600 }}>No logs yet</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Webhook events will appear here</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: dark ? "#12121c" : "#f8fafc" }}>
                  {["Username", "Reel ID", "Prompt Sent", "Timestamp"].map(h => (
                    <th key={h} style={{
                      padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 700,
                      color: sub, textTransform: "uppercase", letterSpacing: "0.05em",
                      borderBottom: `1px solid ${border}`, whiteSpace: "nowrap"
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={l.id} style={{ borderBottom: i < logs.length - 1 ? `1px solid ${border}` : "none" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: "#6366f1", fontSize: 14 }}>@{l.instagram_username}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        background: "#06b6d418", color: "#06b6d4", padding: "3px 8px",
                        borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: "monospace"
                      }}>{l.reel_id}</span>
                    </td>
                    <td style={{ padding: "14px 20px", color: dark ? "#cbd5e1" : "#475569", fontSize: 13, maxWidth: 280 }}>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {l.prompt_sent.substring(0, 60)}{l.prompt_sent.length > 60 ? "..." : ""}
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", color: sub, fontSize: 13, whiteSpace: "nowrap" }}>
                      {new Date(l.sent_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsPage({ dark }) {
  const c = dark ? "#f1f5f9" : "#0f172a";
  const sub = dark ? "#64748b" : "#94a3b8";
  const border = dark ? "#2a2a3e" : "#e5e7eb";

  const sections = [
    {
      title: "Instagram Account", icon: "📱", fields: [
        { label: "Connected Account", placeholder: "@your_instagram_handle", badge: "Not connected" },
        { label: "Access Token", placeholder: "EAA...", type: "password" },
      ]
    },
    {
      title: "Meta App Configuration", icon: "⚙️", fields: [
        { label: "Meta App ID", placeholder: "123456789" },
        { label: "App Secret", placeholder: "••••••••", type: "password" },
      ]
    },
    {
      title: "Webhook", icon: "🔗", fields: [
        { label: "Webhook URL", placeholder: "https://your-domain.com/webhook", readonly: true },
        { label: "Verify Token", placeholder: "your-secret-token" },
      ]
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: c, margin: 0 }}>Settings</h1>
        <p style={{ color: sub, marginTop: 6, fontSize: 14 }}>Configure your Instagram integration</p>
      </div>

      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px",
        background: "#f59e0b18", border: "1px solid #f59e0b30", borderRadius: 10,
        color: "#f59e0b", fontWeight: 600, fontSize: 13, marginBottom: 24
      }}>
        🚧 Integration settings — Coming Soon (Instagram Graph API)
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sections.map(({ title, icon, fields }) => (
          <div key={title} style={{
            background: dark ? "#1e1e2e" : "#fff", borderRadius: 14,
            border: `1px solid ${border}`, overflow: "hidden",
            boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <div style={{ padding: "18px 24px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <span>{icon}</span>
              <span style={{ fontWeight: 700, color: c, fontSize: 15 }}>{title}</span>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              {fields.map(({ label, placeholder, type, badge, readonly }) => (
                <div key={label}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: c }}>{label}</label>
                    {badge && <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 999,
                      background: "#ef444418", color: "#ef4444", fontWeight: 600
                    }}>{badge}</span>}
                  </div>
                  <input
                    type={type || "text"} placeholder={placeholder} disabled readOnly={readonly}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8,
                      border: `1px solid ${border}`, background: dark ? "#12121c" : "#f8fafc",
                      color: sub, fontSize: 14, outline: "none",
                      boxSizing: "border-box", opacity: 0.7, cursor: "not-allowed", fontFamily: "inherit"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <Icon.Dashboard /> },
  { key: "add", label: "Add Reel", icon: <Icon.Add /> },
  { key: "manage", label: "Manage Reels", icon: <Icon.Reels /> },
  { key: "logs", label: "Activity Logs", icon: <Icon.Activity /> },
  { key: "settings", label: "Settings", icon: <Icon.Settings /> },
];

function Sidebar({ page, setPage, dark, collapsed, onClose }) {
  const border = dark ? "#2a2a3e" : "#e5e7eb";
  return (
    <div style={{
      width: collapsed ? 0 : 220, minWidth: collapsed ? 0 : 220,
      background: dark ? "#12121c" : "#fafafa",
      borderRight: `1px solid ${border}`, height: "100vh",
      overflow: "hidden", transition: "width 0.25s, min-width 0.25s",
      display: "flex", flexDirection: "column", position: "relative", zIndex: 10,
      flexShrink: 0
    }}>
      <div style={{ padding: "20px 16px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
          <Icon.Instagram />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, color: dark ? "#f1f5f9" : "#0f172a", whiteSpace: "nowrap" }}>PromptBot</div>
          <div style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8", whiteSpace: "nowrap" }}>Automation</div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "8px 10px" }}>
        {navItems.map(({ key, label, icon }) => {
          const active = page === key;
          return (
            <button key={key} onClick={() => { setPage(key); if (onClose) onClose(); }} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
              borderRadius: 10, marginBottom: 2, width: "100%", textAlign: "left",
              border: "none", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
              background: active ? (dark ? "#6366f122" : "#6366f112") : "transparent",
              color: active ? "#6366f1" : (dark ? "#64748b" : "#94a3b8"),
              fontWeight: active ? 700 : 500, fontSize: 14
            }}>
              <span style={{ flexShrink: 0 }}>{icon}</span>
              <span>{label}</span>
              {active && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "#6366f1" }} />}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "12px 16px", borderTop: `1px solid ${border}` }}>
        <div style={{ fontSize: 11, color: dark ? "#475569" : "#cbd5e1", textAlign: "center", fontWeight: 500 }}>
          v1.0.0 · FastAPI + React
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const bg = dark ? "#0d0d1a" : "#f0f2f5";
  const topbar = dark ? "#12121c" : "#fff";
  const border = dark ? "#2a2a3e" : "#e5e7eb";
  const c = dark ? "#f1f5f9" : "#0f172a";

  const pageLabel = navItems.find(n => n.key === page)?.label || "Dashboard";

  return (
    <div style={{ display: "flex", height: "100vh", background: bg, fontFamily: "'Inter', -apple-system, sans-serif", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #6366f140; border-radius: 3px; }
        body { margin: 0; }
        @media (max-width: 768px) { .desktop-sidebar { display: none !important; } }
      `}</style>

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar" style={{ display: "flex" }}>
        <Sidebar page={page} setPage={setPage} dark={dark} collapsed={!sidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebar && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileSidebar(false)} />
          <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
            <Sidebar page={page} setPage={setPage} dark={dark} collapsed={false} onClose={() => setMobileSidebar(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Topbar */}
        <div style={{
          height: 60, background: topbar, borderBottom: `1px solid ${border}`,
          display: "flex", alignItems: "center", padding: "0 20px", gap: 14,
          flexShrink: 0, boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.06)"
        }}>
          <button onClick={() => { setSidebarOpen(p => !p); setMobileSidebar(p => !p); }} style={{
            background: "none", border: "none", cursor: "pointer",
            color: dark ? "#64748b" : "#94a3b8", display: "flex", padding: 4
          }}><Icon.Menu /></button>

          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: c }}>{pageLabel}</span>
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 6, padding: "5px 10px",
            background: dark ? "#1e1e2e" : "#f1f5f9", borderRadius: 8,
            border: `1px solid ${border}`
          }}>
            <span style={{ fontSize: 12, color: "#22c55e" }}>●</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: dark ? "#94a3b8" : "#64748b" }}>Backend</span>
          </div>

          <button onClick={() => setDark(p => !p)} style={{
            width: 36, height: 36, borderRadius: 8, border: `1px solid ${border}`,
            background: dark ? "#1e1e2e" : "#f1f5f9", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: dark ? "#94a3b8" : "#64748b"
          }}>
            {dark ? <Icon.Sun /> : <Icon.Moon />}
          </button>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "28px 24px" }}>
          {page === "dashboard" && <DashboardPage dark={dark} addToast={addToast} />}
          {page === "add" && <AddReelPage dark={dark} addToast={addToast} />}
          {page === "manage" && <ManageReelsPage dark={dark} addToast={addToast} />}
          {page === "logs" && <ActivityLogsPage dark={dark} addToast={addToast} />}
          {page === "settings" && <SettingsPage dark={dark} />}
        </div>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
