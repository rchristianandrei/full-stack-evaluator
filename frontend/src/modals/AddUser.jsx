import { useEffect, useState } from "react";
import userRepo from "../api/userRepo";
import { BackDrop } from "../components/BackDrop";
import { Modal } from "../components/modal/Modal";
import { ModalContainer } from "../components/modal/ModalContainer";
import { ModalCloseButton } from "../components/modal/ModalCloseButton";
import { ModalHeader } from "../components/modal/ModalHeader";
import { GenericInput } from "../components/inputs/GenericInput";
import { SubmitButton } from "../components/buttons/SubmitButton";

function AddUser(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errMssg, setErrMssg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrMssg("");

    userRepo
      .add(formData)
      .then(() => {
        props.onClose(true);
      })
      .catch((err) => {
        setErrMssg(err.response.data.message);
      });
  };

  return (
    <ModalContainer>
      {/* Overlay */}
      <BackDrop onClick={() => props.onClose(false)} />

      {/* Modal Box */}
      <Modal>
        <ModalCloseButton
          onClick={() => props.onClose(false)}
        ></ModalCloseButton>

        <ModalHeader>Create User Form</ModalHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <GenericInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            required={true}
          />

          <GenericInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            required={true}
          />

          {errMssg && <div className="text-red-400">{errMssg}</div>}

          <SubmitButton>Add</SubmitButton>
        </form>
      </Modal>
    </ModalContainer>
  );
}

export default AddUser;
