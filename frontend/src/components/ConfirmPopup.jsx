import { BackDrop } from "./modal/BackDrop";
import { Modal } from "./modal/Modal";
import { ModalCloseButton } from "./modal/ModalCloseButton";
import { ModalContainer } from "./modal/ModalContainer";
import { ModalHeader } from "./modal/ModalHeader";

export function ConfirmPopup({
  isOpen = false,
  title = "Are you sure?",
  message = "Do you want to continue?",
  onYes,
  onNo,
  yesText = "Yes",
  noText = "No",
}) {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <BackDrop onClick={onNo}></BackDrop>
      <Modal>
        <ModalCloseButton onClick={onNo}></ModalCloseButton>
        <ModalHeader>{title}</ModalHeader>
        <p className="mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onNo}
            className="px-4 py-2 rounded border border-black hover:border-white transition"
          >
            {noText}
          </button>

          <button
            onClick={onYes}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {yesText}
          </button>
        </div>
      </Modal>
    </ModalContainer>
  );
}
