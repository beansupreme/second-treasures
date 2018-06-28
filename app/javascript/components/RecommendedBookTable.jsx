import React from "react";
import axios from "axios";
import RecommendedBookTableRow from './RecommendedBookTableRow'
import NewBookForm from './NewBookForm'
import ErrorList from './ErrorList'
import MessageBox from './MessageBox'

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

  componentDidMount() {
    axios.get('/api/v1/books').then(response => {
      this.setState({books: response.data})
    }).catch(error => {      
      this.setState({
        errors: ['Something went wrong... Books are not available at this time.'],
        message: ''
      });
    });
  }

  handleNewBookAdd(book) {
    this.setState({
      books: this.state.books.concat([book])
    });
  }

  handleBookUpdate(book) {
    console.log('book update!')
    console.log(book)
    axios.put(`/api/v1/books/${book.id}`, book).then(response => {
      this.setState({message: `Book with id ${book.id} was updated`});
      // this.removeBook(bookId);
      setTimeout(() => {
        this.setState({message: ''})
      }, 5000);
    }).catch(error => {  
      let response = error.response;
      if (response.status === 422) {
        this.setState({
          errors: response.data,
          message: ''
        });
      } else {
        this.setState({
          errors: ['Something went wrong... Books cannot be updated at this time.'],
          message: ''
        });
      }   
      
    })
  }

  handleBookDelete(bookId) {
    axios.delete(`/api/v1/books/${bookId}`).then(response => {
      this.setState({message: `Book with id ${bookId} was deleted`});
      this.removeBook(bookId);
      setTimeout(() => {
        this.setState({message: ''})
      }, 5000);
    }).catch(error => {      
      this.setState({
        errors: ['Something went wrong... Books cannot be deleted at this time.'],
        message: ''
      });
    })
  }

  removeBook(bookId) {
    let updatedBookList = this.state.books.filter((book, i) => book.id !== bookId);
    this.setState({
      books: updatedBookList
    });
  }

  updateBook(bookId, fieldsToUpdate) {
    let updatedBooks = this.state.books.map((book) =>
      (book.id === bookId) ? Object.assign({}, book, fieldsToUpdate) : book
    );
    this.setState({books: updatedBooks});
  }

  render() {
    return (
      <React.Fragment>
        <ErrorList id="recommended-book-table-errors" errors={this.state.errors} />
        <MessageBox id="recommended-book-table-message" message={this.state.message} />
        <table id="recommended-book-table" className="table table-bordered">
          <caption>Recommended Books</caption>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>ISBN</th>
              <th>Genre</th>
              <th>Actions</th>
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
        <NewBookForm onNewBookAdd={this.handleNewBookAdd}/>
      </React.Fragment>
    )
  }
}

export default RecommendedBookTable;