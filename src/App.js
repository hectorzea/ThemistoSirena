import React, {Fragment, useState, useEffect} from 'react';
import Login from "./components/Login";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Home from "./components/Home";
import Button from "react-bootstrap/cjs/Button";

function App() {

    const [user, setUser] = useState({
        logged: false
    });



    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser({...foundUser, logged: true});
        }
    }, []);


    return (
        <Fragment>
            <Container className="ContainerApp" fluid>
                <Row>
                    <Col>
                        <h1 className="text-center">Mephisto</h1>
                    </Col>
                </Row>
                {!user.logged ?
                    <Row className="justify-content-md-center">
                        <Login user={user} setUser={setUser}/>
                    </Row> :
                    <Home user={user} setUser={setUser} />
                }

            </Container>
        </Fragment>
    );
}

export default App;
