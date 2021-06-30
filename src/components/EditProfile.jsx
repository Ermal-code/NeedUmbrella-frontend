import React, { useState } from "react";
import { Form } from "react-bootstrap";

const EditProfile = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditProfile;
