import { createStore, compose } from 'redux';

const defaultState = {

    comments: [
        {
            id: "1",
            postid: "1",
            userid: "user1",
            content: "this is user1",
            parentId: null,
            created_on: "2020-05-25 17:39:49.554808-05",
            updated_on: "2020-05-25 17:39:49.554808-05",
        },
        {
            id: "2",
            postid: "1",
            userid: "user2",
            content: "user2 responding to user1's comment",
            parentId: "1",
            created_on: "2020-11-23 12:59:55",
            updated_on: "2020-11-23 12:59:55",
        },

        {
            id: "3",
            postid: "1",
            userid: "user1",
            content: "user1 responding to user2's nested comment",
            parentId: "2",
            created_on: "2020-11-23 13:59:55",
            updated_on: "2020-11-23 13:59:55",

        }
    ],

    user: {}

}

function reducer(state, action) {
    debugger;
    let { type, item } = action;
    let comments = [...state.comments]
    if (type === "SUBMIT_COMMENT") {
        debugger;
        comments.push(item);
        return {
            comments
        }
    }

    if (type === "REPLY_COMMENT") {
        // item = {commentObj, parentid}
        let comments = [...state.comments];
        return {
            comments
        }

    }

    if (type === "GET_COMMENT") {
        let new_comments = [...state.comments]
        let new_state = new_comments.concat(item)
        return new_state
    }

    if(type === "add_user"){
        debugger;
        return state.user = {...item}

    }

    return state;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, defaultState, composeEnhancers())

export default store
