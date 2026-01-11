import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { ConfirmPopup } from "../components/ConfirmPopup";
import authRepo from "../api/authRepo";
import userRepo from "../api/userRepo";

export function Header() {
  const { user, setUser } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const OnLogout = async () => {
    setOpen(false);
    try {
      await authRepo.logout();
      setUser(null);
    } catch (err) {}
  };

  const OnDeleteAccount = () => {
    setConfirmData(() => ({
      isOpen: true,
      title: "Delete Account",
      message: "Are you sure you want to delete your account?",
      onYes: async () => {
        setOpen(false);
        try {
          await userRepo.deleteById(user.id);
          await authRepo.logout();
          setUser(null);
        } catch (err) {}
      },
      onNo: () => {
        setConfirmData((data) => ({ ...data, isOpen: false }));
      },
      yesText: "Delete",
      noText: "Cancel",
    }));
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-semibold">📝 React Task Evaluator</h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-sm font-medium hover:opacity-50 focus:outline-none"
          >
            {user.email}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 border bg-[#242424] shadow-lg">
              <ul className="py-1 text-sm">
                <li>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-white hover:text-black"
                    onClick={OnLogout}
                  >
                    Logout
                  </button>
                </li>

                <li>
                  <button
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                    onClick={OnDeleteAccount}
                  >
                    Delete account
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
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
