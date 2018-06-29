require 'rails_helper'

describe Book, type: :model do
  describe 'validations' do
    let(:book) do
      Book.create(
        title: 'Something'
      )
    end
    let(:absurdly_long_string) do
      1000.times.map {'A'}
    end
    before do
      expect(book.valid?).to eq(true)
    end

    it 'should validate presence of title' do
      book.update(title: '')
      expect(book.valid?).to eq(false)

      book.update(title: 'Present')
      expect(book.valid?).to eq(true)
    end

    it 'should validate max length of ISBN' do
      book.update(isbn: '978-0440238133000000000000000000000')
      expect(book.valid?).to eq(false)

      book.update(isbn: '978-3-16-148410-0')
      expect(book.valid?).to eq(true)
    end

    it 'should validate max length of genre' do
      book.update(genre: absurdly_long_string)
      expect(book.valid?).to eq(false)

      book.update(genre: 'A reasonable length')
      expect(book.valid?).to eq(true)
    end

    it 'should validate max length of author' do
      book.update(author: absurdly_long_string)
      expect(book.valid?).to eq(false)

      book.update(author: 'A reasonable length')
      expect(book.valid?).to eq(true)
    end
  end
end
