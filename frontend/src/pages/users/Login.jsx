import { useState } from "react";
import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/usersController";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // use Auth context
  const { setUser } = useAuthContext();

  // use navigate hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState(false);

  // Form data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      // update user state
      setUser((prevState) => ({ ...prevState, email }));
      // navigate
      navigate("/dashboard");
      // reset input
      setEmail("");
      setPassword("");
      setError(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="flex flex-col min-h-screen  justify-center items-center gap-10 ">
      <h1 className="text-3xl font-semibold">Login to your account.</h1>
      <form
        onSubmit={handleLogin}
        className="max-w-md w-[448px]  flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email Address"
          autoFocus
          className="border border-black px-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="border border-black px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-indigo-900 text-white duration-300 py-1 rounded-md">
          Login
        </button>
        {error && <Alert msg={error} />}
      </form>
    </section>
  );
};
export default Login;
