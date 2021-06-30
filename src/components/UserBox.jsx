import React, { useState } from "react";
import { Button } from "react-bootstrap";

const UserBox = ({
  user,
  capitalize,
  fetchLogOut,
  handleShow,
  setEditProfile,
}) => {
  const [showEditOrDelete, setShowEditOrDelete] = useState(false);

  const handleShowAndRemoveBox = (index) => {
    handleShow();
    setShowEditOrDelete(false);
    if (index === 0) {
      setEditProfile(true);
    } else {
      setEditProfile(false);
    }
  };

  return (
    <div className="userBox text-center border-top border-light">
      <div className="position-relative d-flex justify-content-center align-items-center mt-2">
        <img
          className="mr-5 stay"
          src={user.img}
          style={{
            borderRadius: "50%",
            height: "50px",
            objectFit: "cover",
          }}
        />
        {user.name && (
          <div>
            <h4>
              {capitalize(user.name)} {capitalize(user.lastName)}
            </h4>
          </div>
        )}
        <i
          className="fas fa-ellipsis-v ml-5"
          style={{ fontSize: "24px" }}
          onClick={() => setShowEditOrDelete(!showEditOrDelete)}
        ></i>
        {showEditOrDelete && (
          <div className="editOrDeleteBox">
            <ul>
              {["Edit Account", "Delete Account"].map((el, index) => (
                <li
                  key={`${el}${index}`}
                  onClick={() => handleShowAndRemoveBox(index)}
                >
                  {el}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button
        variant="outline-light"
        className="rounded-pill mt-3"
        style={{ width: "60%", fontWeight: "bold", fontSize: "20px" }}
        onClick={() => fetchLogOut()}
      >
        Sing Out
      </Button>
    </div>
  );
};

export default UserBox;
