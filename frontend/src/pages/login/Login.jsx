import { useState } from "react";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { GenericInput } from "../../components/inputs/GenericInput";
import authRepo from "../../api/authRepo";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    authRepo
      .login(formData.email, formData.password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
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
          <SubmitButton>Login</SubmitButton>
        </form>
      </section>
    </section>
  );
}
