import axios from 'axios';
import { guid } from '../snippets/helpers';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_CLIP = 'CREATE_CLIP';
export const DELETE_CLIP = 'DELETE_CLIP';
export const UPDATE_CLIP_NAME = 'UPDATE_CLIP_NAME';

const API = 'http://localhost:3000/api';


export function fetchPosts() {
  const posts = axios.get(`${API}/posts`);

  return {
    type: FETCH_POSTS,
    payload: posts
  }
}


export function createClip(blob, clipName) {
  //const request = axios.post(`${API}/posts`);

  return {
    type: CREATE_CLIP,
    id: guid(),
    clipName,
    blob
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
