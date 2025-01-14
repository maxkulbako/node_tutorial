import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface LoginResponse {
  token: string;
}

interface DashboardResponse {
  msg: string;
}

function App() {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/api/v1/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setError("");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const getDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<DashboardResponse>(
        "http://localhost:3000/api/v1/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.msg);
      setError("");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setData("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        {!token ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div>
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded p-2 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-2 text-gray-900"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button
              onClick={getDashboardData}
              className="w-full bg-green-500 text-white rounded p-2 hover:bg-green-600"
            >
              Get Data
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white rounded p-2 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}

        {data && (
          <div className="mt-4 p-4 bg-black text-white rounded">
            <p>{data}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
