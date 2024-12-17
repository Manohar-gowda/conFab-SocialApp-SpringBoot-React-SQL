import { api } from "../../config/api"
import { FIND_POST_BY_ID_FAILURE, FIND_POST_BY_ID_SUCCESS, GET_ALL_POSTS_FAILURE,LIKE_POST_FAILURE, LIKE_POST_SUCCESS, RE_POST_FAILURE, RE_POST_SUCCESS, REPLY_POST_FAILURE, REPLY_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_SUCCESS, POST_DELETE_FAILURE, POST_DELETE_SUCCESS, POST_GET_USERS_POST_FAILURE, POST_GET_USERS_POST_SUCCESS, USER_LIKE_POST_FAILURE, USER_LIKE_POST_SUCCESS, GET_ALL_POSTS_SUCCESS } from "./ActionType";


export const getAllPosts= () => async (dispatch)=>{
    try {
        const { data } = await api.get("/api/posts/");
        console.log("get all posts: " ,data);
        dispatch({type: GET_ALL_POSTS_SUCCESS, payload: data})
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:GET_ALL_POSTS_FAILURE, payload:error.message})
    }
}

export const getUsersPost= (userId) => async (dispatch)=>{
    try {
        const {data} = await api.get(`/api/posts/user${userId}`);
        console.log("get user post: ",data);
        dispatch({type: POST_GET_USERS_POST_SUCCESS, payload: data})
        
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:POST_GET_USERS_POST_FAILURE, payload:error.message})
    }
}

export const findPostsByLikeContentUser = (userId) => async (dispatch)=>{
    try {
        const {data} = await api.get(`/api/posts/user${userId}/likes`);
        console.log("User Like POSTs: ",data);
        dispatch({type: USER_LIKE_POST_SUCCESS, payload: data})
        
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:USER_LIKE_POST_FAILURE, payload:error.message})
    }
}

export const findPostsById= (POSTId) => async (dispatch)=>{
    try {
        const {data} = await api.get(`/api/posts/${POSTId}`);
        console.log("Find post by id: ",data);
        dispatch({type: FIND_POST_BY_ID_SUCCESS, payload: data})
        
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:FIND_POST_BY_ID_FAILURE, payload:error.message})
    }
}

export const createPost = (PostData) => async (dispatch)=>{
    try {
        const {data} = await api.post(`/api/posts/create`,PostData);
        console.log("Created POST: ",data);
        dispatch({type:POST_CREATE_SUCCESS, payload: data})
        
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:POST_CREATE_FAILURE, payload:error.message})
    }
}

export const createPostReply= (PostData) => async (dispatch)=>{
    try {
        const {data} = await api.post(`/api/posts/reply`, PostData);
        console.log("Created Reply: ",data);
        dispatch({type:REPLY_POST_SUCCESS, payload: data})
        
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:REPLY_POST_FAILURE, payload:error.message})
    }
}

export const createRePost = (PostId) => async (dispatch)=>{
    try {
        const {data} = await api.put(`/api/posts/${PostId}/repost`);
        console.log("Repost: ",data);
        dispatch({type:RE_POST_SUCCESS, payload: data})
        
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:RE_POST_FAILURE, payload:error.message})
    }
}

export const likePost = (PostId) => async (dispatch)=>{
    try {
        const {data} = await api.post(`/api/${PostId}/likes`);
        console.log("Like POST: ",data);
        dispatch({type:LIKE_POST_SUCCESS, payload: data})
        
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:LIKE_POST_FAILURE, payload:error.message})
    }
}

export const deletePost = (PostId) => async (dispatch)=>{
    try {
        const {data} = await api.delete(`/api/post/${PostId}`);
        console.log("Deleted POST: ",data);
        dispatch({type:POST_DELETE_SUCCESS, payload: PostId})
        
    } catch (error) {
        console.log("catch error - ",error);
        dispatch({type:POST_DELETE_FAILURE, payload:error.message})
    }
}