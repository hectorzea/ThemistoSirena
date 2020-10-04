import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/cjs/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Table from "react-bootstrap/cjs/Table";
import SearchOrder from "./SearchOrders";
import Product from "./Product";
import axios from "axios";
import {getOrders, getCreatedProducts, postSO, getIndividualSO} from "../api"
import _ from "lodash";
import Spinner from "react-bootstrap/cjs/Spinner";
import FormSO from "./FormSO";
import Form from 'react-bootstrap/Form';

const Home = ({logged, setLogged, user, setUser}) => {
    console.log(process.env.REACT_APP_URLAPI);
    const [orders, setSearchOrders] = useState([]);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchOrderQuery, setSearchOrderQuery] = useState("");

    useEffect(() => {

        getOrders(user._id).then((response) => {
            let searchOrders = response.data.searchOrders;
            setSearchOrders([...orders, ...searchOrders]);
        }).catch((e) => {
            console.log(e)
        })
    }, []);


    const refreshState = (response, searchOrder) => {
        let oSearchOrder = response.data.searchOrders.find(e => e._id === searchOrder);
        let aOrders = [...orders];
        let index = _.findIndex(aOrders, e => e._id === oSearchOrder._id);
        aOrders[index] = oSearchOrder;
        setSearchOrders(aOrders);
    };

    const getProducts = (searchOrder, query) => {
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_URLAPI}/api/product/saveProducts`, {
                query: query,
                searchOrder: searchOrder,
            }).then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            });
        });

    };

    const createSO = async (payload) => {
        let response = await postSO(payload)
        if (response.status === 200) {
            setSearchOrders([...orders, response.data.orderDB]);
        }
    };


    const loadProducts = async (sId) => {
        let productsResponse = await getCreatedProducts(sId);
        let products = productsResponse.data.products;
        setProductList(products);
        setLoading(false);
    };

    const changeOrderStatus = (searchOrder, status, query) => {
        setLoading(true);
        setSearchOrders([]);
        console.log(searchOrder, status);
        axios.post(`${process.env.REACT_APP_URLAPI}/api/product/checkProduct`, {
            query: query,
            searchOrder: searchOrder,
            status: status
        }).then((response) => {
            getOrders(user._id).then((response) => {
                refreshState(response, searchOrder);
                getProducts(searchOrder, query).then(() => {
                    getOrders(user._id).then((response) => {
                        refreshState(response, searchOrder);
                        loadProducts(searchOrder);
                    }).catch((e) => {
                        console.log(e)
                    })
                }).catch((e) => {
                    console.log(e)
                });
            }).catch((e) => {
                console.log(e)
            })
        }).catch((e) => {
            console.log(e)
        })
    };

    const searchOrder = async (e) => {
        try {
            if (searchOrderQuery) {
                let response = await getIndividualSO(searchOrderQuery);
                if (response.status === 200) {
                    setSearchOrders(response.data.SOs);
                }
            } else {
                getOrders(user._id).then((response) => {
                    let searchOrders = response.data.searchOrders;
                    setSearchOrders(searchOrders);
                }).catch((e) => {
                    console.log(e)
                })
            }
        } catch (e) {
            setSearchOrders([]);
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        setUser({logged: false});
        localStorage.setItem("userId", "");
    };

    return (
        <Container fluid>
            <Row>
                <Col lg={{span: 4, offset: 4}}>
                    <Row>
                        <Button block size="lg" onClick={handleLogout}>Logout</Button>
                    </Row>
                </Col>
            </Row>
            <Row className={"paddingContainer"}>
                <Col lg={{span: 2, offset: 1}}>
                    <Row>
                        <h2>Create Search Order</h2>
                        <FormSO user={user} createSO={createSO}/>
                    </Row>
                </Col>
                <Col lg={{span: 4, offset: 1}}>
                    <Row>
                        <Col lg={4}>
                            <h2>Order List</h2>
                        </Col>
                        <Form>
                            <Form.Row className="align-items-center">
                                <Col lg={10}>
                                    <Form.Label htmlFor="inlineFormInput" srOnly>
                                        Name
                                    </Form.Label>
                                    <Form.Control
                                        onChange={(e) => {
                                            setSearchOrderQuery(e.target.value);
                                        }}
                                        name="searchOrderQuery"
                                        className="mb-2"
                                        id="inlineFormInput"
                                        placeholder="1231kasdasxm234234sdd"
                                    />
                                </Col>
                                <Col lg={2}>
                                    <Button type="submit" onClick={(e) => {
                                        e.preventDefault();
                                        searchOrder(e.target.value)
                                    }} className="mb-2">
                                        Submit
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>

                    </Row>
                    <Row>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Query</th>
                                <th>Provider</th>
                                <th>Order Status</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(searchOrder => (
                                <SearchOrder loadProducts={loadProducts} loading={loading} setLoading={setLoading}
                                             setProductList={setProductList} changeOrderStatus={changeOrderStatus}
                                             searchOrder={searchOrder}
                                             key={searchOrder._id}/>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
                <Col lg={{span: 2, offset: 1}}>
                    <Row>
                        <h2>Products</h2>
                    </Row>
                    <Row>
                        {!loading ? null : <Spinner animation="border"/>}
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productList.map(product => (
                                <Product product={product} key={product._id}/>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
