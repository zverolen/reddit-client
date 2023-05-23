import React, { useEffect } from "react";
import { CommentsItem } from "../../common/commentsItem/CommentsItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, selectData, selectCommentsStatus } from "./commentsSlice";
import { Collapsible } from "../../common/collapsible/Collapsible";

export function Comments({ feedItemData }) {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const status = useSelector(selectCommentsStatus);

  let content;

  //1. Load comments when the button is clicked
  //2. Load comments only if they are not loaded

  if (status === 'success') {
    content = data.data.children.map((comment) => <CommentsItem key={comment.data.id} data={comment.data} />);
  } else if (status === 'loading') {
    content = <p>loading</p>;
  }
  
  function showComments(e) {
    e.preventDefault();
    dispatch(fetchComments(feedItemData.permalink));
  }

  return(
          <Collapsible buttonName="Show Comments">
              <div>
              <button onClick={showComments}>Show Comments</button>
              <h3>Comments</h3>
              <div data-test="comments-content">
                {content}
              </div>
            </div>
          </Collapsible>
        )
  ;
}