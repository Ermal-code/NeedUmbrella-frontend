import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import axios from "../helpers/apiCall";

const EditOrDeleteModal = ({
  showModal,
  handleClose,
  editProfile,
  user,
  fetchUser,
  history,
}) => {
  const [post, setPost] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [loading, setLoading] = useState(false);

  const handleCloseAndClearPost = () => {
    handleClose();
    if (editProfile) setPost(null);
  };

  const uploadPicture = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/users/uploadPicture`,
        post,
        { withCredentials: true }
      );

      if (response.status === 201) {
        fetchUser();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const editAccount = async () => {
    try {
      setLoading(true);
      const body = { email, password, name, lastName };

      if (body.password === "") delete body.password;

      const response = await axios.put(
        `${process.env.REACT_APP_BE_URL}/users/me`,
        body,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
        if (post) {
          uploadPicture();
        }

        fetchUser();
        setLoading(false);
        handleCloseAndClearPost();
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BE_URL}/users/me`,
        { withCredentials: true }
      );

      if (response.status === 203) {
        localStorage.setItem("LoggedIn", false);
        setTimeout(() => {
          window.location.reload();
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  const editOrDeleteAccount = () => {
    if (editProfile) {
      editAccount();
    } else {
      deleteAccount();
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseAndClearPost}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editProfile ? "Edit Profile" : "Delete Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProfile ? (
            <EditProfile
              img={user.img}
              setPost={setPost}
              email={email}
              password={password}
              name={name}
              lastName={lastName}
              setEmail={setEmail}
              setPassword={setPassword}
              setName={setName}
              setLastName={setLastName}
            />
          ) : (
            <DeleteAccount />
          )}
        </Modal.Body>
        <Modal.Footer
          className={`d-flex ${
            editProfile ? "justify-content-end" : "justify-content-around"
          }`}
        >
          <Button
            variant={editProfile ? "outline-secondary" : "primary"}
            onClick={handleCloseAndClearPost}
            disabled={loading}
          >
            {editProfile ? "Close" : "No"}
          </Button>
          <Button
            variant={editProfile ? "primary" : "danger"}
            onClick={editOrDeleteAccount}
            disabled={loading}
          >
            {editProfile ? "Save Changes" : "Yes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditOrDeleteModal;
