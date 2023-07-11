import React, { useState } from "react";
import { CommentsItem } from "../../common/commentsItem/CommentsItem";
import { useSelector } from "react-redux";
import { selectCommentsStatus } from "./commentsSlice";
import { Collapsible } from "../../common/collapsible/Collapsible";

import { data } from "../../data/testingDataComments";

export function Comments({ feedItemData }) {
  const status = useSelector(selectCommentsStatus);
  //MEMO: Local state: comments are specific to each instance of the component and are not needed in other components.
  const [ comments, setComments ] = useState([]);

  let content = <p>loading</p>;

  // Issue or point of concideration: comments are defined only when status is success.
  if (status === 'success') {
    // content = data.data.children.map((comment) => <CommentsItem key={comment.data.id} data={comment.data} />);
    content = comments.map((comment) => <CommentsItem key={comment.data.id} data={comment.data} />);
  }

  if (comments.length > 0) {
    content = comments.map((comment) => <CommentsItem key={comment.data.id} data={comment.data} />);
  }

  // MEMO: Event handler
  // MEMO: Triggers rerender (text in comments)
  function handleFetchComments(e) {
    e.preventDefault();
    setComments(data);
    // LEGACY: was used for making requests to the Reddit json api.
    // const url = `https://www.reddit.com${feedItemData.permalink}.json`;
    // const response = fetch(url)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error: ${response.status}`);
    //     }
    //     return response.json()
    //   })
    //   .then((json) => {
    //     setComments(json[1].data.children.slice(0, 15));
    //     return json;
    //   });
  }

  return(
          //MEMO: Passing children as props so that Collapsible could wrap whatever content
          <Collapsible 
            openActionName="Show Comments"
            closeActionName="Hide Comments"
            onAdditionalAction={handleFetchComments} 
            additionalActionRequired={true}
          >
              <div>
              <h4>Comments</h4>
              <div data-test="comments-content">
                {content}
              </div>
            </div>
          </Collapsible>
        )
  ;
}