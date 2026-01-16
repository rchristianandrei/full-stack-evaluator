import { useState } from "react";
import taskRepo from "../../api/taskRepo";
import { BackDrop } from "../../components/modal/BackDrop";
import { Modal } from "../../components/modal/Modal";
import { ModalContainer } from "../../components/modal/ModalContainer";
import { ModalCloseButton } from "../../components/modal/ModalCloseButton";
import { ModalHeader } from "../../components/modal/ModalHeader";
import { GenericInput } from "../../components/inputs/GenericInput";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { toast } from "react-toastify";

function AddTask(props) {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    taskRepo
      .addTask(formData)
      .then(() => {
        props.onClose(true);
        toast.success("Successfully created task");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Add Task: " + err.message);
      });
  };

  return (
    <>
      {props.isOpen && (
        <ModalContainer className="fixed inset-0 z-50 flex items-center justify-center">
          <BackDrop onClick={() => props.onClose(false)} />

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
      )}
    </>
  );
}

export default AddTask;
