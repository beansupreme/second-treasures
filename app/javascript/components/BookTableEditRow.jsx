import React from "react"

/* 
  BookTableEditRow is rendered when 'edit' is clicked, it passes
  changes up to it's parent
*/

class BookTableEditRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveClick = this.handleSaveClick.bind(this); 
    this.updateField = this.updateField.bind(this); 
  }

  handleSaveClick() {
    this.props.onUpdate(this.props.book);
  }

  updateField(event) {
    let fieldName = event.target.name.split('-')[1];
    let fieldsToUpdate = {};
    fieldsToUpdate[fieldName] = event.target.value;
    this.props.onFieldChange(this.props.book.id, fieldsToUpdate)
  }

  render () {
    const book = this.props.book;
    return (
      <tr className="recommended-book-edit-row">
        <td>
          <input className="form-control" 
            type="text" name="edit-title"
            defaultValue={book.title} onChange={this.updateField}
          />
        </td>
        <td>
          <input className="form-control" 
            type="text" name="edit-author"
            defaultValue={book.author}  onChange={this.updateField}
          />
        </td>
        <td>
          <input className="form-control" 
            type="number" name="edit-price" min="0" max="20000" step="0.01"
            defaultValue={book.price}  onChange={this.updateField}
          />
        </td>
        <td>
          <input className="form-control" 
            type="text" name="edit-isbn"
            defaultValue={book.isbn}  onChange={this.updateField}
          />
        </td>
        <td>
          <input className="form-control" 
              type="text" name="edit-genre"
              defaultValue={book.genre}  onChange={this.updateField}
            />
        </td>
        <td>
          <div className="btn-group" role="group">
            <button className="btn btn-success save-book" onClick={this.handleSaveClick}>
              Save
            </button>
          </div>
        </td>
      </tr>

    )
  }
}

export default BookTableEditRow;