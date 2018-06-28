import React from "react";
class RecommendedBookTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this); 
  }

  handleDeleteClick() {
    this.props.onBookDelete(this.props.book.id)
  }
  
  render() {
    let book = this.props.book;
    return (
      <tr className="recommended-book-row">
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>${book.price}</td>
        <td>{book.isbn}</td>
        <td>
          <button className="btn btn-danger delete-book" onClick={this.handleDeleteClick}>Delete</button>
        </td>
      </tr>
    )
  }  
}

RecommendedBookTableRow.defaultProps = {
  onBookDelete: () => {}
}


export default RecommendedBookTableRow;