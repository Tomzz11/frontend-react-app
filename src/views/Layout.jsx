import { useState, useEffect } from "react"; // นำเข้า useState
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";

export function Layout() {
  const apiBase = import.meta.env.VITE_API_URL;

  // States สำหรับจัดการ Auth
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // ตรวจสอบสถานะ Login เมื่อโหลดหน้าเว็บ (Check Session)
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      try {
        // เพิ่ม const response เพื่อรับค่าจาก axios
        const response = await axios.get(`${apiBase}/auth/cookie/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, [apiBase]);

  // ฟังก์ชัน Login
  const login = async ({ email, password }) => {
    setAuthError(null);
    try {
      const response = await axios.post(
        `${apiBase}/auth/cookie/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Login failed";
      
      setAuthError(message);
      setUser(null);
      return false; // เปลี่ยนจาก null เป็น false เพื่อให้เช็คสถานะง่ายขึ้น
    }
  };

  // ฟังก์ชัน Logout
  const logout = async () => {
    setAuthError(null);
    try {
      await axios.post(`${apiBase}/auth/cookie/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <div>
      <Navbar 
        user={user} 
        authLoading={authLoading} 
        authError={authError} 
        login={login} 
        logout={logout} 
      />
      <main className="bg-amber-200 flex justify-center min-h-screen">
        <Outlet context={{ user, authLoading, apiBase }} />
      </main>
    </div>
  );
}




