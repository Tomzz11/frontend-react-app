import { useState } from "react"; // เพิ่มบรรทัดนี้
import { Link } from "react-router-dom";

export function Navbar({ user, authLoding, authError, login, logout }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login({ email, password });
    setSubmitting(false);

    if (ok) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <nav>
      <div className="flex justify-between px-10 items-center w-full bg-teal-500 h-14 border-b-2 border-black gap-x-6 text-2xl text-white">
        {/* Menu Links */}
        <ul className="flex justify-start items-center gap-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-500">Home</Link>
          </li>
          <li>
            <Link to="/owner" className="hover:text-yellow-500">Owner</Link>
          </li>
        </ul>

        {/* Auth Section */}
        <div>
          {authLoding ? (
            <span className="text-base italic">Checking auth session...</span>
          ) : user ? (
            <div className="flex items-center gap-x-4">
              <span className="text-base">Logged in as <span className="font-bold">{user.username}</span></span>
              <button 
                onClick={logout} 
                className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl text-base"
              >
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                type="email"
                className="bg-white text-black px-2 rounded border text-base w-44"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                type="password"
                minLength={8}
                className="bg-white text-black px-2 rounded border text-base"
              />
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white px-3 py-1 rounded-xl text-base"
              >
                {submitting ? "..." : "Login"}
              </button>
            </form>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {authError && (
        <div className="bg-red-100 text-red-600 text-center py-1 text-sm">
          {authError}
        </div>
      )}
    </nav>
  );
}


