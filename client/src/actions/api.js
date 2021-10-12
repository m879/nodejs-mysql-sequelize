import React from 'react';
import axios from 'axios';


export const CreateUser = (data) => {
    return axios.post(`http://localhost:4000/api/insert`, data)
    .then((res) => {
        console.log("Created Successfully");
        return res.data;
    })
    .catch((error) => {
        if(error){
            console.log(error.response.data);
        }
    });
};


export const GetAllUser = () => {
    return axios.get(`http://localhost:4000/api/details`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const GetUserbyId = (id) => {
    return axios.get(`http://localhost:4000/api/details/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};


export const DeleteUser = (id) => {
    return axios.delete(`http://localhost:4000/api/delete/${id}`)
    .then((res) => {
        console.log("Deleted Successfully")
    })
    .catch((err) => console.log(err));
};

export const UpdateUser = (id,data) => {
    return axios.put(`http://localhost:4000/api/update/${id}`,data).then((res) => {
            console.log("Updated Successfully")
    })
    .catch((err) => console.log(err));
};