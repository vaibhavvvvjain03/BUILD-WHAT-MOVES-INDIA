"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

// ── Session shape ─────────────────────────────────────────────────────────────
export interface Session {
  isLoggedIn: boolean;
  mobileNumber: string | null;
  linkedDL: string | null;     // set once user confirms/links a licence
  sessionId: string | null;
  // ── Full profile fields (populated at login, either path) ──
  name: string | null;
  dateOfBirth: string | null;
  address: string | null;
  loginMethod: "aadhaar" | "manual" | null;
}

const EMPTY_SESSION: Session = {
  isLoggedIn: false,
  mobileNumber: null,
  linkedDL: null,
  sessionId: null,
  name: null,
  dateOfBirth: null,
  address: null,
  loginMethod: null,
};

const LS_KEY = "parivahan_session";

// ── globalThis store (survives Next.js hot-reload in dev) ──────────────────
declare global {
  // eslint-disable-next-line no-var
  var __sessionStore: Session | undefined;
}

function readGlobal(): Session {
  return global.__sessionStore ?? EMPTY_SESSION;
}

function writeGlobal(s: Session) {
  global.__sessionStore = s;
}

// ── localStorage helpers (browser persistence across hard refreshes) ────────
function readLocalStorage(): Session {
  if (typeof window === "undefined") return EMPTY_SESSION;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return EMPTY_SESSION;
    return JSON.parse(raw) as Session;
  } catch {
    return EMPTY_SESSION;
  }
}

function writeLocalStorage(s: Session) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch {
    // silently ignore quota errors
  }
}

function clearLocalStorage() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
interface LoginPayload {
  mobileNumber: string;
  sessionId: string;
  name?: string;
  dateOfBirth?: string;
  address?: string;
  linkedDL?: string | null;
  loginMethod?: "aadhaar" | "manual";
}

interface SessionContextValue {
  session: Session;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  linkDL: (dlNumber: string) => void;
  setProfile: (patch: Partial<Pick<Session, "name" | "dateOfBirth" | "address">>) => void;
}

const SessionContext = createContext<SessionContextValue>({
  session: EMPTY_SESSION,
  login: () => {},
  logout: () => {},
  linkDL: () => {},
  setProfile: () => {},
});

// ── Provider ──────────────────────────────────────────────────────────────────
export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session>(EMPTY_SESSION);

  // On first mount: restore from localStorage (or globalThis in dev)
  useEffect(() => {
    const fromGlobal = readGlobal();
    if (fromGlobal.isLoggedIn) {
      setSessionState(fromGlobal);
      return;
    }
    const fromLS = readLocalStorage();
    if (fromLS.isLoggedIn) {
      writeGlobal(fromLS);
      setSessionState(fromLS);
    }
  }, []);

  const persist = useCallback((s: Session) => {
    writeGlobal(s);
    writeLocalStorage(s);
    setSessionState(s);
  }, []);

  const login = useCallback(
    (payload: LoginPayload) => {
      persist({
        isLoggedIn: true,
        mobileNumber: payload.mobileNumber,
        linkedDL: payload.linkedDL ?? null,
        sessionId: payload.sessionId,
        name: payload.name ?? null,
        dateOfBirth: payload.dateOfBirth ?? null,
        address: payload.address ?? null,
        loginMethod: payload.loginMethod ?? null,
      });
    },
    [persist]
  );

  const logout = useCallback(() => {
    clearLocalStorage();
    writeGlobal(EMPTY_SESSION);
    setSessionState(EMPTY_SESSION);
  }, []);

  const linkDL = useCallback(
    (dlNumber: string) => {
      const next: Session = { ...readGlobal(), linkedDL: dlNumber };
      persist(next);
    },
    [persist]
  );

  const setProfile = useCallback(
    (patch: Partial<Pick<Session, "name" | "dateOfBirth" | "address">>) => {
      const next: Session = { ...readGlobal(), ...patch };
      persist(next);
    },
    [persist]
  );

  return (
    <SessionContext.Provider value={{ session, login, logout, linkDL, setProfile }}>
      {children}
    </SessionContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useSession() {
  return useContext(SessionContext);
}
