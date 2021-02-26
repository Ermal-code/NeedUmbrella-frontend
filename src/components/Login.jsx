import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Login = (props) => {
  const [singUp, setSingUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const singInOrSingUp = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (!singUp) {
        response = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
      } else {
        response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name, lastName }),
          }
        );
      }
      if (response.ok) {
        props.history.push("/home");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="headerUmb  text-light text-center p-2">
        <h1>DO I NEED AN UMBREALLA TODAY</h1>
      </div>
      <Row className="mt-5">
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 8, offset: 2 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          className="text-light"
        >
          <div className="addCity mt-5 mb-3 p-2">
            <form onSubmit={singInOrSingUp} className="px-4 pt-5 mx-3">
              {singUp && (
                <>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      value={lastName}
                      onChange={(e) => setLastName(e.currentTarget.value)}
                    />
                  </Form.Group>
                </>
              )}

              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <Form.Text className="text-danger">
                  We'll never share your email with anyone else.
                </Form.Text>
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

              <div className="d-flex justify-content-center my-4">
                <Button variant="primary" type="submit">
                  {!singUp ? "Sing In " : "Sing Up"}
                </Button>
              </div>
              <div className="SingUP text-center text-warning">
                <h6 onClick={() => setSingUp(!singUp)}>
                  {!singUp
                    ? "Don't have account - Sing Up!"
                    : "Already have account - Sing In!"}
                </h6>
              </div>
            </form>
            <div className="border-top border-muted text-center">
              <h6 className="text-center text-success mt-3">
                Or Sing In with Google
              </h6>
              <a href={`${process.env.REACT_APP_BE_URL}/users/googleLogin`}>
                <Button
                  variant="success"
                  className="my-2 rounded-pill"
                  style={{ width: "80%" }}
                >
                  Google
                </Button>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
