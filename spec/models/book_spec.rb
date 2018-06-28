require 'rails_helper'

describe Book, type: :model do
  describe 'validations' do
    it 'should validate presence of title' do
      book_without_title = Book.create(title: '')
      expect(book_without_title.valid?).to eq(false)

      book_without_title = Book.create(title: 'Present')
      expect(book_without_title.valid?).to eq(true)
    end
  end
end
