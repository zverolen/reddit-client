import React from "react";
import { formatDate } from "../../util/util";
// import ReactMarkdown from "react-markdown";


export function CommentsItem({ data }) {

  return(
  <div data-test="comments-item" key={data.id}>
    <p data-test="comments-author">{data.author}</p>
    <p data-test="comments-created">{formatDate(data.created_utc)}</p>
    <p data-test="comments-text">{data.body}</p>
    <hr></hr>
  </div>
  );
}