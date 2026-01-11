import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { GenericInput } from "../../components/inputs/GenericInput";
import authRepo from "../../api/authRepo";
import { ConfirmPopup } from "../../components/ConfirmPopup";

export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errMssg, setErrMssg] = useState("");
  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    title: "Are you sure?",
    message: "Do you want to continue?",
    onYes: () => {
      console.log("Yes");
    },
    onNo: () => {
      console.log("No");
    },
    yesText: "Yes",
    noText: "No",
  });

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

    setConfirmData(() => ({
      isOpen: true,
      title: "Create a new account",
      message: "Are you sure you want to register?",
      onYes: async () => {
        try {
          await authRepo.register(formData.email, formData.password);
          setConfirmData((data) => ({
            isOpen: true,
            title: "Successfully Registered!",
            message: "Do you want to log in?",
            onYes: () => {
              navigate("/login");
            },
            onNo: () => {
              setConfirmData((data) => ({ ...data, isOpen: false }));
            },
            yesText: "Go to login page",
            noText: "Cancel",
          }));
        } catch (err) {
          setErrMssg(err.response.data);
        }
      },
      onNo: () => {
        setConfirmData((data) => ({ ...data, isOpen: false }));
      },
      yesText: "Register",
      noText: "Cancel",
    }));
  };

  return (
    <>
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
            {errMssg && (
              <div className="text-red-400 text-center">{errMssg}</div>
            )}
            <SubmitButton>Register</SubmitButton>
            <a className="text-center" href="/login">
              Login
            </a>
          </form>
        </section>
      </section>
      <ConfirmPopup
        isOpen={confirmData.isOpen}
        title={confirmData.title}
        message={confirmData.message}
        onYes={confirmData.onYes}
        onNo={confirmData.onNo}
        yesText={confirmData.yesText}
        noText={confirmData.noText}
      ></ConfirmPopup>
    </>
  );
}
