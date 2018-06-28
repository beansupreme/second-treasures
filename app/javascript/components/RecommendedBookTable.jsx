import React from "react";
import axios from "axios";
import RecommendedBookTableRow from './RecommendedBookTableRow'
import NewBookForm from './NewBookForm'

class RecommendedBookTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    axios.get('/api/v1/books').then(response => {
      this.setState({books: response.data})
    });
  }

  render() {
    const recommendedBooks = this.state.books.map((book) =>
     <RecommendedBookTableRow key={book.id} book={book} />
    )
    return (
      <React.Fragment>
        <table id="recommended-book-table" className="table table-bordered">
          <caption>Recommended Books</caption>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {recommendedBooks}
          </tbody>
        </table>
        <NewBookForm />
      </React.Fragment>
    )
  }
}

export default RecommendedBookTable;