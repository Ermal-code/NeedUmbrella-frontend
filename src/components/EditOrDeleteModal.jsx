import React from "react";
import { Modal, Button } from "react-bootstrap";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";

const EditOrDeleteModal = ({ showModal, handleClose, editProfile, user }) => {
  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editProfile ? "Edit Profile" : "Delete Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProfile ? <EditProfile user={user} /> : <DeleteAccount />}
        </Modal.Body>
        <Modal.Footer
          className={`d-flex ${
            editProfile ? "justify-content-end" : "justify-content-around"
          }`}
        >
          <Button
            variant={editProfile ? "outline-secondary" : "primary"}
            onClick={handleClose}
          >
            {editProfile ? "Close" : "No"}
          </Button>
          <Button
            variant={editProfile ? "primary" : "danger"}
            onClick={handleClose}
          >
            {editProfile ? "Save Changes" : "Yes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditOrDeleteModal;
