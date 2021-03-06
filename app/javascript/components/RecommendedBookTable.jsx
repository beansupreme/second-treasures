import React from "react";
import axios from "axios";
import RecommendedBookTableRow from './RecommendedBookTableRow'
import NewBookForm from './NewBookForm'
import ErrorList from './ErrorList'
import MessageBox from './MessageBox'

/* 
  RecommendedBookTable is resonsible for rendering the entire GUI
  for the manage books page. It manages the books collection in it's state. 
*/
class RecommendedBookTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errors: [],
      message: ''
    }

    this.handleNewBookAdd = this.handleNewBookAdd.bind(this); 
    this.handleBookDelete = this.handleBookDelete.bind(this); 
    this.handleBookUpdate = this.handleBookUpdate.bind(this); 
    this.updateBook = this.updateBook.bind(this); 
  }
  // Pull down all books in beginning of lifecycle
  componentDidMount() {
    axios.get('/api/v1/books').then(response => {
      this.setState({books: response.data})
    }).catch(error => {     
      this.setErrorMessage('Something went wrong... Books are not available at this time.');
    });
  }

  handleNewBookAdd(book) {
    this.setState({
      books: this.state.books.concat([book])
    });
  }

  // The afterUpdateCallback is a function intended to be called when the
  // this component is PUTing to the server. If there are errors, it will
  // tell the child so the RecommendedBookTableRow will remain in the correct state (editMode)
  handleBookUpdate(book, afterUpdateCallback) {
    axios.put(`/api/v1/books/${book.id}`, book).then(response => {
      this.setTemporaryMessage(`Book with id ${book.id} was updated`);
      afterUpdateCallback(true);
    }).catch(error => {  
      let response = error.response;
      let genericError = 'Something went wrong... Books cannot be updated at this time.'
      // Display dynamic error messages from server if 422, otherwise a static message. 
      let errorMessage = response.status === 422 ? response.data : genericError;
      this.setErrorMessage(errorMessage)
      afterUpdateCallback(false);         
    })
  }

  handleBookDelete(bookId) {
    axios.delete(`/api/v1/books/${bookId}`).then(response => {
      this.setTemporaryMessage(`Book with id ${bookId} was deleted`)
      
      this.removeBook(bookId);
    }).catch(error => {      
      this.setErrorMessage('Something went wrong... Books cannot be deleted at this time.')      
    })
  }
  
  // TODO: pull this function out to be shared across components
  setTemporaryMessage(message) {
    this.setState({message: message, errors: []});
    this.clearMessagesAfterTimeout();
  }

  clearMessagesAfterTimeout() {
    setTimeout(() => {
      this.setState({message: ''})
    }, 5000);
  }

  setErrorMessage(errorMessage) {
    this.setState({
      errors: [errorMessage],
      message: ''
    });
  }

  removeBook(bookId) {
    let updatedBookList = this.state.books.filter((book, i) => book.id !== bookId);
    this.setState({
      books: updatedBookList
    });
  }

  // State should be immutable - so here we create a carbon copy of 
  // the book to be updated rather than changing it directly
  updateBook(bookId, fieldsToUpdate) {
    let updatedBooks = this.state.books.map((book) =>
      (book.id === bookId) ? Object.assign({}, book, fieldsToUpdate) : book
    );
    this.setState({books: updatedBooks});
  }

  // This component is quite large, and could be broken up with some thoughtful refactoring
  // Loops through every book in the current state and builds a table row for it,
  // as well as a NewBookForm in a separate row to add books. 
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
          <ErrorList id="recommended-book-table-errors" errors={this.state.errors} />
          <MessageBox id="recommended-book-table-message" message={this.state.message} />
          <table id="recommended-book-table" className="table table-bordered">
            <caption>Recommended Books</caption>
            <thead>
              <tr>
                <th scope="col" className="w-40">Title</th>
                <th scope="col" className="w-20">Author</th>
                <th scope="col" className="w-5">Price</th>
                <th scope="col" className="w-15">ISBN</th>
                <th scope="col" className="w-10">Genre</th>
                <th scope="col" className="w-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.books.map((book) =>
                 <RecommendedBookTableRow key={book.id} book={book} 
                 onBookDelete={this.handleBookDelete}  onBookUpdate={this.handleBookUpdate}
                 onFieldChange={this.updateBook}
                  />
                )
              }
            </tbody>
          </table>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <NewBookForm onNewBookAdd={this.handleNewBookAdd}/>
          </div>
        </div>                
      </React.Fragment>
    )
  }
}

export default RecommendedBookTable;