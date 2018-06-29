import React from "react";
import axios from "axios";
import GuestBookListItem from './GuestBookListItem'
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
      <GuestBookListItem key={book.id} book={book}/>
    );
    return (
      <div id="recommended-book-list">
        {bookItems}
      </div>
    );
  }
}

export default GuestBookList
