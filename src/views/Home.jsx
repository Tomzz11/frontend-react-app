import { useEffect, useState } from "react";
import { UserTable } from "../components/UserTable";
import { AdminTable } from "../components/AdminTable";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

// const API = "https://67eca027aa794fb3222e43e2.mockapi.io/members";
// const API = "http://localhost:3001/api/v2/users";
// const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const { user, authLoading, apiBase } = useOutletContext();
  const [view, setView] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(apiBase);
      setUsers(res.data.data);
    } catch {
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-6 gap-y-6 flex flex-col justify-start w-full">
      {/* --- Header Section --- */}
      <section className="mt-20 text-5xl font-extrabold text-center">
        <h1>Generation Thailand</h1>
        <h1>React Assessment</h1>
      </section>

      {/* --- Navigation Buttons --- */}
      <section className="flex justify-center gap-x-3 font-bold">
        <button
          onClick={() => setView("user")}
          className="p-5 bg-sky-200 flex rounded-2xl cursor-pointer border hover:bg-sky-300"
        >
          User Section
        </button>
        <button
          onClick={() => setView("admin")}
          className="p-5 bg-rose-100 flex rounded-2xl cursor-pointer border hover:bg-rose-200"
        >
          Admin Section
        </button>
      </section>

      {/* --- Content Display Section --- */}
      <section className="w-full flex justify-center gap-x-3">
        {/* แสดงผลตามค่า view */}
        {view === "user" && (
          <div className="p-5 flex">
            <UserTable users={users} />
          </div>
        )}

        {view === "admin" && (
          <div className="p-5 flex">
            {authLoading ? (
              <div>Checking user auth...</div>
            ) : user ? (
              <AdminTable
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                API={apiBase}
              />
            ) : (
              <div>Please log in to access Admin features.</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}


