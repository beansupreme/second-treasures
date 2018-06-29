import React from "react";
import CurrencySpan from "./CurrencySpan";

function GuestBookListItem(props) {
  let book = props.book;
  return (
    <div className="card w-50">      
      <div className="card-body">
        <h4 className="card-title">{book.title}</h4>
        <div>
          <span>Author:</span> 
          <span className="font-italic">{book.author}</span>
        </div>
        <span>ISBN: {book.isbn}</span>
        <div>Price: <CurrencySpan number={book.price} /></div>
      </div>
    </div>
  );
}

export default GuestBookListItem;