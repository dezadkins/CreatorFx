import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
// import "./LoginForm.css";

export default function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="navbar__button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Log In
      </button>
      {showModal && (
        <>
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        </>
      )}
    </>
  );
}
