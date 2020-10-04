import React from 'react';
import Button from "react-bootstrap/cjs/Button";

const Product = ({product}) => {
    const {productTitle, price} = product;
    return (
        <tr>
            <td>{productTitle}</td>
            <td>{price}</td>
        </tr>
    );
};

export default Product;
