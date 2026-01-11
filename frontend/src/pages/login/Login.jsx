import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { GenericInput } from "../../components/inputs/GenericInput";
import authRepo from "../../api/authRepo";
import { useAuth } from "../../context/AuthProvider";

export function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errMssg, setErrMssg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMssg("");

    try {
      await authRepo.login(formData.email, formData.password);
      const user = await authRepo.getMe();
      setUser(user);
      navigate("/", { replace: true });
    } catch (err) {
      setErrMssg(err.response.data);
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <section className="border rounded p-10">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <h1 className="text-center">Task Manager</h1>
          <GenericInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required={true}
          />
          <GenericInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />
          {errMssg && <div className="text-red-400 text-center">{errMssg}</div>}
          <SubmitButton>Login</SubmitButton>
          <a className="text-center" href="/register">
            Register
          </a>
        </form>
      </section>
    </section>
  );
}
