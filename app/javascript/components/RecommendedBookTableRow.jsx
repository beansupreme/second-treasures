import React from "react";
import BookTableEditRow from "./BookTableEditRow";
import BookTableViewRow from "./BookTableViewRow";

class RecommendedBookTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this); 
    this.handleEditClick = this.handleEditClick.bind(this); 
    this.handleUpdate = this.handleUpdate.bind(this); 
    this.afterUpdate = this.afterUpdate.bind(this); 
  }

  handleDeleteClick() {
    this.props.onBookDelete(this.props.book.id)
  }

  handleEditClick() {
    this.setState({editMode: true})
  }

  handleUpdate(book) {    
    this.props.onBookUpdate(book, this.afterUpdate);
  }

  afterUpdate(success) {
    if (success) {
      this.setState({editMode: false}) 
    }
  }
  
  render() {
    return (
      this.state.editMode ?
      <BookTableEditRow book={this.props.book} onUpdate={this.handleUpdate}
      onFieldChange={this.props.onFieldChange}
      /> 
      :
      <BookTableViewRow book={this.props.book} 
      onEditClick={this.handleEditClick} onDeleteClick={this.handleDeleteClick} />
    )
  }  
}

RecommendedBookTableRow.defaultProps = {
  onBookDelete: () => {},
  onBookUpdate: () => {}
}


export default RecommendedBookTableRow;