import axios from 'axios';

export const getTodosApi = async () =>
  await axios
    .get('/')
    .then(res => res.data.records)
    .catch(err => {
      throw err;
    });

export const addTodoApi = async ({ fields: { description } }) =>
  await axios
    .post(
      '/',
      JSON.stringify({
        fields: {
          description,
        },
      })
    )
    .catch(err => {
      throw err;
    });

export const updateTodoApi = async ({ id, fields }) =>
  await axios
    .patch(
      '/',
      JSON.stringify({
        records: [
          {
            id,
            fields,
          },
        ],
      })
    )
    .catch(err => {
      throw err;
    });

export const deleteTodoApi = async todo =>
  await axios.delete('/' + todo.id).catch(err => {
    throw err;
  });
