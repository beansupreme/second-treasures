import React from "react";
import axios from "axios";
class GuestBookList extends React.Component {
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


  render () {
    const bookItems = this.state.books.map((book) => 
      <li key={book.id}>
        {book.title} by {book.author}
      </li>
    );
    return (
      <div>
        <h3>Our recommended books:</h3>
        
        <ul id="recommended-book-list">
          {bookItems}
        </ul>
      </div>
    );
  }
}

export default GuestBookList
