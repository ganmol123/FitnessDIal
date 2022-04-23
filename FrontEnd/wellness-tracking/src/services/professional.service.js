import axios from '../axios';
export const getProfessionalData = (id)=> axios.get(`/api/professional/dashboard/${id}`);

export const getProfessionalContent = (id)=> axios.get(`/api/professional/dashboard/${id}/content`);

export const getClients = (id)=> axios.get(`/api/professional/dashboard/${id}`);

export const uploadFile = (id,file)=> { axios.post(`/api/professional/dashboard/${id}/upload`,file,{headers:{"Content-Type": "multipart/form-data"}})}