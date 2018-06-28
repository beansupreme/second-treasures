import React from "react"

function BookTableViewRow(props) {
  const book = props.book;
  return (
    <tr className="recommended-book-row">
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>${book.price}</td>
      <td>{book.isbn}</td>
      <td>{book.genre}</td>
      <td>
        <div className="btn-group" role="group">
          <button className="btn btn-warning edit-book" onClick={props.onEditClick}>Edit</button>
          <button className="btn btn-danger delete-book" onClick={props.onDeleteClick}>Delete</button>          
        </div>
      </td>
    </tr>
  )
}

export default BookTableViewRow;