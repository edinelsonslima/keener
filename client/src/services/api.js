import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

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
