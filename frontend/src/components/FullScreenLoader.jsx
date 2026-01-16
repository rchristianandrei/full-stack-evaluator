import { BackDrop } from "./modal/BackDrop";

export function FullScreenLoader({ open, message }) {
  return (
    <>
      {open && (
        <>
          <BackDrop></BackDrop>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-50">
            <span className="font-bold">{message}</span>
            <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin" />
          </div>
        </>
      )}
    </>
  );
}
