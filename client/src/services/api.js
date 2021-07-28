import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});


//Rotas de Produtos
export const handlerAdd = (nome, descricao, preco) => {
  try {
    axios({
      method: "post",
      url: "/produto",
      data: {
        nome: nome,
        descricao: descricao,
        preco: preco,
      },
    });
    return true;
  } catch (error) {
    console.log("Adicionar: " + error);
    return false;
  }
};

export const handlerGet = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/produto",
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("Get all produtos: " + error);
    return false;
  }
};

export const handlerSearch = async (id) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/produto/${id}`,
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("buscar " + error);
    return false;
  }
};

export const handlerUpdate = async (id, nome, descricao, preco) => {
  try {
    const { data } = await axios({
      method: "put",
      url: `/produto/${id}`,
      data: {
        nome: nome,
        descricao: descricao,
        preco: preco,
      },
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("Update " + error);
    return false;
  }
};

export const handlerDelete = async (id) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `/produto/${id}`,
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("Delete " + error);
    return false;
  }
};


//Rotas de usuários
export const handlerAddUser = (user, email, password) => {
  try {
    axios({
      method: "post",
      url: "/user",
      data: {
        user: user,
        email: email,
        password: password,
      },
    });
    return true;
  } catch (error) {
    console.log("Adicionar user: " + error);
    return false;
  }
};

export const handlerSearchUser = async (id) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/user/${id}`,
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("buscar " + error);
    return false;
  }
};

export const handlerUpdateUser = async (id, user, email, password) => {
  try {
    const { data } = await axios({
      method: "put",
      url: `/user/${id}`,
      data: {
        user: user,
        email: email,
        password: password,
      },
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("Update " + error);
    return false;
  }
};

export const handlerDeleteUser = async (id) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `/user/${id}`,
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("Delete " + error);
    return false;
  }
};


//Rotas de Registros
export const handlerGetRegister = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/registro/full",
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("Get all produtos: " + error);
    return false;
  }
};

export const handlerGetEdited = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/registro/edited",
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("Get all produtos: " + error);
    return false;
  }
};

export const handlerGetDeleted = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/registro/deleted",
      mode: "cors",
      cache: "default",
    });
    return data;
  } catch (error) {
    console.log("Get all produtos: " + error);
    return false;
  }
};