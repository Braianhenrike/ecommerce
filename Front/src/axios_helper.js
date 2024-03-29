import axios from 'axios';


export const setAuthHeader = (token) => {
  window.localStorage.setItem('apiToken', token);
};

export const getUserInfo = async (userId) => {
  return request('GET', `/admin/user-profile/edit/${userId}`);
};

export const updateUser = async (userID, user) => {
  console.log("enviado: ", { ...userID, ...user });
  return request('PUT', `/admin/user-profile/${userID}`, { ...userID, ...user });
};

export const createProduto = async (product) => {
  console.log("Produto enviado: ", product);
  return request('POST', `/product/admin`, product);
};

export const updateProduto = async (productId, product) => {
  console.log("Produto enviado para atualização: ", product);
  return request('PUT', `/product/admin/${productId}`, product);
};

export const deleteProduct = async (productId) => {
  return request('DELETE', `/product/admin/${productId}`);
};

export const getAllProducts = async () => {
  return request('GET', '/product/home');
};

export const createCategoria = async (categoria) => {
  console.log("Categoria enviada: ", categoria);
  return request('POST', '/api/categorias', categoria);
};



export const getAllCategorias = async () => {
  return request('GET', '/api/categorias');
};


axios.defaults.baseURL = 'http://localhost:8080';

export const request = (method, url, data) => {


    return axios({
        method: method,
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/json',
        }});
};