import React from "react";
function GuestBookListItem(props) {
  let book = props.book;
  return (
    <li>
      {book.title} by {book.author}
    </li>
  );
}

export default GuestBookListItem;