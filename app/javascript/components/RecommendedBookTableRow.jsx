import React from "react";
function RecommendedBookTableRow(props) {
  let book = props.book;
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>${book.price}</td>
      <td>{book.isbn}</td>
    </tr>
  )
}
export default RecommendedBookTableRow;