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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.books.map((book) =>
               <RecommendedBookTableRow key={book.id} book={book} onBookDelete={this.handleBookDelete} />
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