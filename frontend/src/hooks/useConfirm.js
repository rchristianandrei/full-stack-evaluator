import { useState } from "react";

const initialData = {
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
};

export function useConfirm() {
  const [confirmData, setConfirmData] = useState(initialData);

  function onMarkAsDone(message, onYes, onNo) {
    setConfirmData({
      isOpen: true,
      title: "Update Task",
      message,
      onYes,
      onNo,
      yesText: "Mark as Done",
      noText: "Cancel",
    });
  }

  function onDeletePopup(message, onYes, onNo) {
    setConfirmData({
      isOpen: true,
      title: "Delete Task",
      message,
      onYes,
      onNo,
      yesText: "Delete",
      noText: "Cancel",
    });
  }

  function onClose() {
    setConfirmData((data) => ({ ...data, isOpen: false }));
  }

  return {
    confirmData,
    onMarkAsDone,
    onDeletePopup,
    onClose,
  };
}
