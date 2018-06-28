require 'rails_helper'

describe 'Book Management' do
  
  describe 'GET /books' do
    let(:brave_new_world) do
      Book.create!(
        isbn: '978-0060850524', 
        title: 'Brave New World',
        author: 'Aldous Huxley',
        price: 16.31
      )
    end
    let(:golden_compass) do
      Book.create!(
        isbn: '978-0440238133', 
        title: 'The Golden Compass',
        author: 'Philip Pullman',
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
          'price' => '16.31'
        },
        {
          'id' => anything,
          'isbn' => '978-0440238133', 
          'title' => 'The Golden Compass',
          'author' => 'Philip Pullman',
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
        price: 16.03
      }
    end

    it 'returns 200' do
      post '/api/v1/books', params: { book: book_data}
      expect(response).to have_http_status(:created)
    end

    it 'creates a new book' do
      post '/api/v1/books', params: { book: book_data}

      expect(Book.find_by_isbn('978-0440238244')).to be_present
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

  describe 'DELETE /books/id' do
    let(:brave_new_world) do
      Book.create!(
        isbn: '978-0060850524', 
        title: 'Brave New World',
        author: 'Aldous Huxley',
        price: 16.31
      )
    end

    it 'destroys the book from record' do
      delete "/api/v1/books/#{brave_new_world.id}"

      expect(response).to have_http_status(200)
      expect(Book.find_by_id(brave_new_world.id)).to be_nil
    end

    it 'returns a 404 if the book does not exist' do
      delete "/api/v1/books/4444"

      expect(response).to have_http_status(:not_found)
    end
  end
end