import React, { useEffect, useState } from "react";
import { CommentsItem } from "../../common/commentsItem/CommentsItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, selectData, selectCommentsStatus } from "./commentsSlice";
import { Collapsible } from "../../common/collapsible/Collapsible";

export function Comments({ feedItemData }) {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const status = useSelector(selectCommentsStatus);
  const [ comments, setComments ] = useState([]);

  let content = <p>loading</p>;

  //1. Load comments when the button is clicked
  //2. Load comments only if they are not loaded

  // Issue or point of concideration: comments are defined only when status is success.
  if (status === 'success') {
    // content = data.data.children.map((comment) => <CommentsItem key={comment.data.id} data={comment.data} />);
    content = comments.map((comment) => <CommentsItem key={comment.data.id} data={comment.data} />);
  }

  if (comments.length > 0) {
    content = comments.map((comment) => <CommentsItem key={comment.data.id} data={comment.data} />);
  }
  
  function showComments(e) {
    e.preventDefault();
    if (status === 'idle') {
      dispatch(fetchComments(feedItemData.permalink));
    } 
  }

  function fetchComments(e) {
    e.preventDefault();
    const url = `https://www.reddit.com${feedItemData.permalink}.json`;
    const response = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json()
      })
      .then((json) => {
        setComments(json[1].data.children.slice(0, 15));
        return json;
      });
  }

  return(
          //NOTE: Passing children as props so that Collapsible could wrap whatever content
          <Collapsible buttonName="Comments" additionalAction={fetchComments} actionRequired={true}>
              <div>
              <h3>Comments</h3>
              <div data-test="comments-content">
                {content}
              </div>
            </div>
          </Collapsible>
        )
  ;
}