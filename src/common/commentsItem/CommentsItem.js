import React from "react";
// import ReactMarkdown from "react-markdown";

// move to util.js
// function formatDate(date) {
//   return new Intl.DateTimeFormat(
//     'en-US',
//     { weekday: 'long' }
//   ).format(date);
// }

export function CommentsItem({ data }) {
  return(
  <div data-test="comments-item" key={data.id}>
    <p data-test="comments-author">{data.author}</p>
    <p data-test="comments-created">{data.created_utc}</p>
    <p data-test="comments-text">{data.body}</p>
    <hr></hr>
  </div>
  );
}