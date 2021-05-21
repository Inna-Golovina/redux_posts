/* eslint-disable import/no-anonymous-default-export */
const moduleName = 'posts';

const GET_POSTS = `${moduleName}/GET_POSTS`;//action
const DELETE_POST = `${moduleName}/DELETE_POST`;
const CREATE_POST = `${moduleName}/CREATE_POST`;

const defaultState = { //state
  posts: [],
};

/* 
  { type: GET_POSTS, payload: {...} }
*/

export default (state = defaultState, {type, payload}) => { //reducer, used destructuring
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload }
      case DELETE_POST:
        return { ...state, posts: state.posts.filter(item => item.id !== payload.id) };
      case CREATE_POST:
        return { ...state, posts: [...state.posts, payload] };
    default:
      return state;
  }
}

export const getPosts = () => async (dispatch) => { //action creator
  try {
    await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_POSTS, payload: data }))
  } catch (error) {
    console.log(error)
  }
  /*
  dispatch({
    type: GET_POSTS,
    payload: [{id: 1, title: 'asd'}]
  })
  */
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });

    dispatch({ type: DELETE_POST, payload: { id } })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = ({ title, body }) => async (dispatch) => {
  try {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: CREATE_POST, payload: data }));
  } catch (error) {
    console.log(error)
  }
}