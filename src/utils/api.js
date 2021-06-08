import axios from 'axios';

export function getDataApi() {
  try {
    return axios.get('/').then(res => res.data.records);
  } catch (error) {
    return error;
  }
}

export function addTodoApi(description) {
  try {
    return axios
      .post(
        '/',
        JSON.stringify({
          fields: {
            description,
          },
        })
      )
      .then(res => res.data);
  } catch (error) {
    return error;
  }
}

export function updateTodoApi(todo) {
  try {
    return axios
      .patch(
        '/',
        JSON.stringify({
          records: [todo],
        })
      )
      .then(res => res.data.records[0]);
  } catch (error) {
    return error;
  }
}

export function deleteTodoApi(id) {
  try {
    return axios.delete('/' + id).then(res => res.data.id);
  } catch (error) {
    return error;
  }
}
