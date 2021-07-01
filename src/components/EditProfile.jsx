import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";

const EditProfile = ({
  img,
  setPost,
  email,
  password,
  name,
  lastName,
  setEmail,
  setPassword,
  setName,
  setLastName,
  loading,
}) => {
  const [base64photo, setBase64photo] = useState(img);

  const inputRef = useRef();

  const fileUploadHandler = (e) => {
    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      setBase64photo(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
    setPost(formData);
  };

  return (
    <div>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Form.Group>
        </Form.Row>
        <div className="d-flex justify-content-center mt-4">
          <img
            alt="Upload"
            id="imageUpload"
            src={base64photo}
            height="300px"
            style={{ objectFit: "Cover", maxWidth: "400px" }}
          />
        </div>
        <Form.Group>
          <Form.Control
            type="file"
            id="fileUpload"
            onChange={fileUploadHandler}
            style={{ display: "none" }}
            ref={inputRef}
          />
          <Button
            className="rounded-pill mr-3 my-3 p-1 px-4 w-100"
            variant="info"
            onClick={() => inputRef.current.click()}
            disabled={loading}
          >
            Upload Image
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditProfile;
