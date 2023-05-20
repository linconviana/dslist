import axios from "axios"
import { BASE_URL } from "./requests"

export const PostPackage = (service: string, data: string, callback: any) => {

    const url = `${BASE_URL}/${service}`;

    const headers = {
        "Content-Type": "application/json"
    }

    axios({
        method: "post",
        url: url,
        data: data,
        headers: headers
    }).then(response =>{
        callback(response);
    }).catch(error => {
        callback(error);
    });
}

export const GetPackage = (id: number, service: string, callback: any) => {

    const url = `${BASE_URL}/${service}/${id}`;

    const headers = {
        "Content-Type": "application/json"
    }

    axios({
        method: "get",
        url: url,
        headers: headers
    }).then(response =>{
        callback(response);
    }).catch(error => {
        callback(error);
    });
}

export const GetAllPackage = (service: string, params: string, callback: any) => {

    const url = `${BASE_URL}/${service}?${params}`;
    const headers = {
        "Content-Type": "application/json"
    }

    axios({
        method: "get",
        url: url,
        headers: headers
    }).then(response =>{
        
        callback(response);
    }).catch(error => {
        callback(error);
    });
}

export const PutPackage = (id: number, service: string, data: string, callback: any) => {

    const url = `${BASE_URL}/${service}/${id}`;

    const headers = {
        "Content-Type": "application/json"
    }

    axios({
        method: "put",
        url: url,
        data: data,
        headers: headers
    }).then(response =>{
        callback(response);
    }).catch(error => {
        callback(error);
    });
}

export const DeletePackage = (id: number, service: string, callback: any) => {

    const url = `${BASE_URL}/${service}/${id}`;

    const headers = {
        "Content-Type": "application/json"
    }

    axios({
        method: "delete",
        url: url,
        headers: headers
    }).then(response =>{
        callback(response);
    }).catch(error => {
        callback(error);
    });
}