import React from "react";
import axios from "axios";
import ErrorList from "./ErrorList"
import MessageBox from "./MessageBox"

/* 
  NewBookForm is resonsible for creating new books. It manages the 
  state for a single new book model. 
*/

const defaultState = {
  title: '',
  author: '',
  price: 0.00,
  isbn: '',
  genre: '',
  errors: [],
  message: ''
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
        book: this.buildBook()        
      }
    ).then(response => {
      this.props.onNewBookAdd(response.data);
      
      this.setState(defaultState);
      this.setTemporaryMessage(`'${response.data.title}' successfully added`)

    }).catch(error => {
      let response = error.response;
      let genericError = 'Something went wrong... Books cannot be created at this time.'
      // Display dynamic error messages from server if 422, otherwise a static message. 
      let errorMessage = response.status === 422 ? response.data : genericError;

      this.setState({
        errors: [errorMessage],
        message: ''
      });
    })
  }

  // setTemporaryMessage and clearMessagesAfterTimeout are candidates
  // to be pulled out into a separate shared file. 
  setTemporaryMessage(message) {
    this.setState({message: message, errors: []});
    this.clearMessagesAfterTimeout();
  }

  clearMessagesAfterTimeout() {
    setTimeout(() => {
      this.setState({message: ''})
    }, 5000);
  }

  buildBook() {
    return {
      title: this.state.title,
      author: this.state.author,
      price: this.state.price,
      isbn: this.state.isbn,
      genre: this.state.genre
    }
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
        <ErrorList id="new-book-form-errors" errors={this.state.errors} />
        <MessageBox id="new-book-form-message" message={this.state.message} />
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
             min="0" max="10000" step="0.01" onChange={this.updateField} value={this.state.price}/>
          </div>
          <div className="form-group">
            <input id="book_isbn_field" name="ISBN" type="text" placeholder="ISBN" className="form-control" 
            onChange={this.updateField} value={this.state.isbn}/>
          </div>
          <div className="form-group">
            <input id="book_genre_field" name="Genre" type="text" placeholder="Genre" className="form-control" 
            onChange={this.updateField} value={this.state.genre}/>
          </div>
          <button type="submit" className="btn btn-success">Save</button>
        </form>  
      </React.Fragment>
    )
  }
}

NewBookForm.defaultProps = {
  onNewBookAdd: () => {}
}

export default NewBookForm;