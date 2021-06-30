import React from "react";
import { Button } from "react-bootstrap";

const UserBox = ({ user, capitalize, fetchLogOut }) => {
  return (
    <div className="userBox text-center border-top border-light">
      <div className="d-flex justify-content-center align-items-center mt-2">
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
