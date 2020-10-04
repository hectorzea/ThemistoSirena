import axios from "axios";

export const getOrders = (userId) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_URLAPI}/api/product/search-orders`, {
            userId: userId
        }).then((response) => {
            resolve(response)
        }).catch((e) => {
            reject(e)
        })
    })

};

export const postSO = (payload) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_URLAPI}/api/product/search`, payload).then((response) => {
            resolve(response)
        }).catch((e) => {
            reject(e)
        })
    })
};

export const getIndividualSO = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_URLAPI}/api/product/search-order/${query}`).then((response) => {
            resolve(response)
        }).catch((e) => {
            reject(e)
        })
    })

};

export const getCreatedProducts = (soId) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_URLAPI}/api/product/`, {
            searchOrder: soId
        }).then((response) => {
            resolve(response)
        }).catch((e) => {
            reject(e)
        })
    })
};