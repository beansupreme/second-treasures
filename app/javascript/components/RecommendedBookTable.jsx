import React from "react";
import axios from "axios";
import RecommendedBookTableRow from './RecommendedBookTableRow'

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
      <table id="recommended-book-table" className="table">
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
    )
  }
}

export default RecommendedBookTable;