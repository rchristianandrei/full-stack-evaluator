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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onNo} /> */}
      <div className="absolute inset-0 bg-black/50" onClick={onNo} />
      {/* Modal */}
      <div className="relative bg-black border rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
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
      </div>
    </div>
  );
}
