import axios from 'axios';
import { guid, blobToBase64 } from '../snippets/helpers';

// auth
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


/*
Posts and Clips are essentially the same except that:
1) Posts are considered public
2) Clips can only be accessed by the person who recorded/created them.
*/

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_CLIP = 'CREATE_CLIP';
export const DELETE_CLIP = 'DELETE_CLIP';
export const UPDATE_CLIP_NAME = 'UPDATE_CLIP_NAME';
export const FETCH_CLIPS = 'FETCH_CLIPS';
export const CLIP_UPLOAD_FAILED = 'CLIP_UPLOAD_FAILED';

const API = 'http://localhost:3000/api';


function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}


function receiveLogin(req) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: req.data.token
  }
}


function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {
  return dispatch => {
    axios.post(`${API}/login`, creds)
      .then(response => {
        dispatch(receiveLogin(response));
      })
      .catch(response => {
        dispatch(loginError('oops'));
      });
  };
}


function receiveRegister(req) {
  return {
    type: REGISTER_SUCCESS,
    id_token: req.data.token
  }
}

function registerError(err) {
  return {
    type: REGISTER_FAILURE,
    errorMessage: err.toString()
  }
}

export function registerUser(creds) {
  return dispatch => {
    axios.post(`${API}/register`, creds)
      .then((response) => {
        dispatch(receiveRegister(response));
      })
      .catch((response) => {
        dispatch(registerError(response));
      })
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}


export function fetchPosts() {
  const posts = axios.get(`${API}/posts`);

  return {
    type: FETCH_POSTS,
    payload: posts
  }
}


function createClipFail(response) {
  return {
    type: CLIP_UPLOAD_FAILED
  };
}


export function createClip(blob, clipName, username) {
  return dispatch => {
    blobToBase64(blob, (base64) => {
      const payload = {
        blob: base64,
        clipName,
        username
      };

      axios.post(`${API}/posts`, payload)
        .then(response => {
          dispatch(fetchClips(payload.username));
        })
        .catch(response => {
          dispatch(createClipFail(response));
        });
    });
  }
}


export function deleteClip(id) {
  return {
    type: DELETE_CLIP,
    id
  }
}


export function updateClipName(id, newName) {
  return {
    type: UPDATE_CLIP_NAME,
    id,
    newName
  }
}


export function fetchClips(username) {
  const clips = axios.get(`${API}/${username}/clips`);

  return {
    type: FETCH_CLIPS,
    payload: clips
  };
}
