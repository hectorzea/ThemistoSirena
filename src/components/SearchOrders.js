import React from 'react';
import Button from "react-bootstrap/cjs/Button";

const SearchOrder = ({searchOrder, changeOrderStatus, loadProducts, setProductList}) => {
    const {_id,query, provider, orderStatus} = searchOrder;
    return (
        <tr>
            <td>{_id}</td>
            <td>{query}</td>
            <td>{provider}</td>
            <td>{orderStatus}</td>
            <td>
                <Button onClick={(e) => {
                    e.preventDefault();
                    if (orderStatus === "failed"){
                        setProductList([]);
                        return;
                    }
                    if (orderStatus === "fulfilled"){
                        loadProducts(_id);
                    }else{
                        setProductList([]);
                        changeOrderStatus(_id,"processing", query);
                    }
                }}>
                    Get Products
                </Button>
            </td>
        </tr>
    );
};

export default SearchOrder;
