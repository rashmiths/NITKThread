import postService from '../services/posts';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_POSTS':
      return action.payload;
    case 'TOGGLE_UPVOTE':
      return state.map((s) =>
        s.id !== action.payload.id ? s : { ...s, ...action.payload.data }
      );
    case 'TOGGLE_DOWNVOTE':
      return state.map((s) =>
        s.id !== action.payload.id ? s : { ...s, ...action.payload.data }
      );
    case 'DELETE_POST':
      return state.filter((s) => s.id !== action.payload);
    default:
      return state;
  }
};

export const initPosts = () => {
  return async (dispatch) => {
    const posts = await postService.getNewPosts();
    dispatch({
      type: 'INIT_POSTS',
      payload: posts.results,
    });
  };
};

export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_UPVOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.upvotePost(id);
  };
};

export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_DOWNVOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

export const removePost = (id) => {
  return async (dispatch) => {
    await postService.deletePost(id);

    dispatch({
      type: 'DELETE_POST',
      payload: id,
    });
  };
};

export default postReducer;