import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

const FormSO = ({user, createSO}) => {

    const {_id} = user;

    const [data, setData] = useState({
        query: "",
        provider: "",
        userId: _id
    });

    const {query, provider} = data;

    const saveInfo = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    return (
        <Form type="submit">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Query</Form.Label>
                <Form.Control type="text" onChange={saveInfo} name="query" value={query} placeholder="Casa"/>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Provider</Form.Label>
                <Form.Control onChange={saveInfo} name="provider" value={provider} as="select">
                    <option value="">--Select an option--</option>
                    <option value="easy">easy.com</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault();
                createSO(data)
            }}>
                Create Search Order
            </Button>
        </Form>
    );
};

export default FormSO;
