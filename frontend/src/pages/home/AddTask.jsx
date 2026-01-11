import { useEffect, useState } from "react";
import taskRepo from "../../api/taskRepo";
import userRepo from "../../api/userRepo";
import { BackDrop } from "../../components/modal/BackDrop";
import { Modal } from "../../components/modal/Modal";
import { ModalContainer } from "../../components/modal/ModalContainer";
import { ModalCloseButton } from "../../components/modal/ModalCloseButton";
import { ModalHeader } from "../../components/modal/ModalHeader";
import { GenericInput } from "../../components/inputs/GenericInput";
import { SubmitButton } from "../../components/buttons/SubmitButton";

function AddTask(props) {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    userRepo
      .getAll(controller)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    taskRepo
      .addTask(formData)
      .then(() => {
        props.onClose(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to submit form.");
      });
  };

  return (
    <ModalContainer className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <BackDrop onClick={() => props.onClose(false)} />

      {/* Modal Box */}
      <Modal>
        <ModalCloseButton
          onClick={() => props.onClose(false)}
        ></ModalCloseButton>

        <ModalHeader>Create Task Form</ModalHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <GenericInput
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className=""
            required={true}
          />

          <textarea
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none resize-none"
            name="details"
            rows={10}
            minLength={1}
            maxLength={100}
            placeholder="Details"
            value={formData.details}
            onChange={handleChange}
            required
          ></textarea>

          <SubmitButton>Add</SubmitButton>
        </form>
      </Modal>
    </ModalContainer>
  );
}

export default AddTask;
