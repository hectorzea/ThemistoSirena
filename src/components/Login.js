import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/cjs/Alert";
import axios from 'axios';

const Login = ({user, setUser}) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const {email, password} = data;

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const saveInfo = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`http://localhost:3001/api/user/login`, data);
            if (resp.data.ok) {
                setUser({...resp.data.user, logged: true});
                localStorage.setItem("userId", JSON.stringify(resp.data.user));
            }
        } catch (err) {
            setError(true);
            setErrorMessage(err.response.data.err);
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={saveInfo} name="email" value={email} placeholder="Enter email"/>
                <Form.Text>
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={saveInfo} name="password" value={password}
                              placeholder="Password"/>
            </Form.Group>
            {error ?
                <Alert variant="danger">
                    {errorMessage}
                </Alert> :
                null}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Login;
