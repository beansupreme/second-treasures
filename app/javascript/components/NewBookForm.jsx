import React from "react";
import axios from "axios";

const defaultState = {
  title: '',
  author: '',
  price: 0.00,
  isbn: '',
  errors: []
}

class NewBookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(
      '/api/v1/books',
      {
        book: {
          title: this.state.title,
          author: this.state.author,
          price: this.state.price,
          isbn: this.state.isbn
        }        
      }
    ).then(response => {
      this.setState(defaultState)
    })
  }


  updateField(event) {
    let fieldName = event.target.id.split('_')[1];
    let fieldsToUpdate = {};
    fieldsToUpdate[fieldName] = event.target.value;
    this.setState(fieldsToUpdate);
  }

  render() {
    return (
      <React.Fragment>
        <h5 className="text-center">Add a new Book recommendation:</h5>
        <form className="form-inline" id="new-book-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input id="book_title_field" name="title" type="text" placeholder="Title" className="form-control" 
            onChange={this.updateField} value={this.state.title}/>
          </div>
          <div className="form-group">
            <input id="book_author_field" name="author" type="text" placeholder="Author" className="form-control" 
            onChange={this.updateField} value={this.state.author}/>
          </div>
          <div className="form-group">
            <input id="book_price_field" name="price" type="number" placeholder="Price" className="form-control" 
            onChange={this.updateField} value={this.state.price}/>
          </div>
          <div className="form-group">
            <input id="book_isbn_field" name="ISBN" type="text" placeholder="ISBN" className="form-control" 
            onChange={this.updateField} value={this.state.isbn}/>
          </div>
          <button type="submit" className="btn btn-success">Save</button>
        </form>  
      </React.Fragment>
    )
  }
}

export default NewBookForm;