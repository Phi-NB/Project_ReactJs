const url = "https://todo-nodemy.herokuapp.com/tasks";

const getDataTodo = (token) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token,
    },
    method: "GET",
  }).then((resp) => resp.json());
};

export const postDataTodo = (token, title) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token,
    },
    body: JSON.stringify({
      title: title,
      status: "todo",
    }),
  }).then((resp) => resp.json());
};
export const updateDataTodo = (token, title, id, status) => {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify({
      id: id,
      title: title,
      status: status,
    }),
  }).then((resp) => resp.json());
};

export const deleteDataTodo = (token, id, title, status) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token,
    },
    body: JSON.stringify({
      id: id,
      title: title,
      status: status,
    }),
  }).then((resp) => resp.json());
};

export default getDataTodo;
