require 'rails_helper'

describe 'Book Management' do

  let(:brave_new_world) do
    Book.create!(
      isbn: '978-0060850524', 
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Fiction',
      price: 16.31
    )
  end
  
  describe 'GET /books' do
    let(:brave_new_world) do
      Book.create!(
        isbn: '978-0060850524', 
        title: 'Brave New World',
        author: 'Aldous Huxley',
        genre: 'Dystopian fiction',
        price: 16.31
      )
    end
    let(:golden_compass) do
      Book.create!(
        isbn: '978-0440238133', 
        title: 'The Golden Compass',
        author: 'Philip Pullman',
        genre: 'Fiction',
        price: 14.96
      )
    end

    let!(:books) do
      [golden_compass, brave_new_world]
    end

    it 'returns 200' do
      get '/api/v1/books'

      expect(response.status).to eq(200)
    end

    it 'returns a list of books in JSON' do
      get '/api/v1/books'

      response_json = JSON.parse(response.body)

      expect(response_json).to match_array([
        {
          'id' => anything,
          'isbn' => '978-0060850524', 
          'title' => 'Brave New World',
          'author' => 'Aldous Huxley',
          'genre' => 'Dystopian fiction',
          'price' => '16.31'
        },
        {
          'id' => anything,
          'isbn' => '978-0440238133', 
          'title' => 'The Golden Compass',
          'author' => 'Philip Pullman',
          'genre' => 'Fiction',
          'price' => '14.96'
        }
      ])
    end
  end

  describe 'POST /books' do
    let(:book_data) do
      {
        isbn: '978-0440238244', 
        title: 'The Subtle Knife',
        author: 'Philip Pullman',
        genre: 'Fiction',
        price: 16.03
      }
    end

    it 'returns 200' do
      post '/api/v1/books', params: { book: book_data}
      expect(response).to have_http_status(:created)
    end

    it 'creates a new book' do
      post '/api/v1/books', params: { book: book_data}

      new_book = Book.find_by_isbn('978-0440238244')
      expect(new_book).to be_present
      expect(new_book.genre).to eq('Fiction')
    end

    it 'returns an error with incomplete data' do
      incomplete_data = {
        isbn: '978-0440238244', 
        title: '',
        author: 'Philip Pullman',
        price: 16.03
      }
      post '/api/v1/books', params: { book: incomplete_data}

      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq(["Title can't be blank"])
    end
  end

  describe 'PUT /books/id' do
    let(:book_data) do
      {
        isbn: '978-0060850524', 
        title: 'Brave New World',
        author: 'Aldous Huxley',
        genre: 'Dystopian Fiction',
        price: 20.99
      }
    end

    it 'returns 200' do
      put "/api/v1/books/#{brave_new_world.id}", params: { book: book_data}
      expect(response).to have_http_status(:ok)
    end

    it 'updates the new book' do
      expect(brave_new_world.price).to eq(16.31)
      expect(brave_new_world.genre).to eq('Fiction')

      put "/api/v1/books/#{brave_new_world.id}", params: { book: book_data}

      brave_new_world.reload

      expect(brave_new_world.genre).to eq('Dystopian Fiction')
      expect(brave_new_world.price).to eq(20.99)
    end

    it 'returns an error with incomplete data' do
      incomplete_data = {
        isbn: '978-0060850524', 
        title: '',
        author: 'Aldous Huxley',
        genre: 'Dystopian Fiction',
        price: 20.99
      }
      put "/api/v1/books/#{brave_new_world.id}", params: { book: incomplete_data}

      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq(["Title can't be blank"])
    end


    it 'returns a 404 if the book does not exist' do
      put "/api/v1/books/444", params: { book: book_data}

      expect(response).to have_http_status(:not_found)
    end
  end  

  describe 'DELETE /books/id' do
    it 'destroys the book from record' do
      delete "/api/v1/books/#{brave_new_world.id}"

      expect(response).to have_http_status(:ok)
      expect(Book.find_by_id(brave_new_world.id)).to be_nil
    end

    it 'returns a 404 if the book does not exist' do
      delete "/api/v1/books/4444"

      expect(response).to have_http_status(:not_found)
    end
  end
end