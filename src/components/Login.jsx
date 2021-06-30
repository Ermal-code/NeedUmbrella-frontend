import React, { useContext, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { ThemeContext, Themes } from "../contexts/theme";

const Login = (props) => {
  const [theme] = useContext(ThemeContext);
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
          credentials: "include",
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
            credentials: "include",
          }
        );
      }
      if (response.ok) {
        localStorage.setItem("LoggedIn", true);
        props.setIsLogedIn();
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
      <Row className="mt-5">
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 8, offset: 2 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          className={`${theme === Themes.dark ? "text-light" : "text-dark"}`}
        >
          <div className="formWrapper mt-5 mb-3 p-2">
            <form onSubmit={singInOrSingUp} className="px-4 pt-5 mx-3 stay">
              {singUp && (
                <>
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
                {!singUp && (
                  <Form.Text className="text-danger">
                    We'll never share your email with anyone else.
                  </Form.Text>
                )}
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
              <a href={`${process.env.REACT_APP_BE_URL}/users/googleLogin`}>
                <Button
                  variant="success"
                  className="mt-4 mb-5 rounded-pill stay"
                  style={{ width: "80%" }}
                  onClick={() => localStorage.setItem("LoggedIn", true)}
                >
                  Sing in with Google
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
