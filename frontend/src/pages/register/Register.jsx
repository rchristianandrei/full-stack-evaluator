import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { GenericInput } from "../../components/inputs/GenericInput";
import authRepo from "../../api/authRepo";

export function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errMssg, setErrMssg] = useState("");

  useEffect(() => {
    if (formData.password === formData.confirmPassword) {
      setErrMssg("");
      return;
    }
    setErrMssg("Password don't match");
  }, [formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errMssg !== "") return;

    console.log(formData);

    try {
      await authRepo.register(formData.email, formData.password);
      alert("Successfully Registered! Do you want to log in?");
    } catch (err) {
      setErrMssg(err.response.data);
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <section className="border rounded p-10 mx-5 w-150">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <h1 className="text-center">Create Account</h1>
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
          <GenericInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={true}
          />
          {errMssg && <div className="text-red-400 text-center">{errMssg}</div>}
          <SubmitButton>Register</SubmitButton>
          <a className="text-center" href="/login">
            Login
          </a>
        </form>
      </section>
    </section>
  );
}
