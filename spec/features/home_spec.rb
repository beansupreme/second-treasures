require 'rails_helper'

describe 'visiting the home page', js: true do
  let!(:a_man_called_ove) do
    Book.create!(
      isbn: '9781473616349', 
      title: 'A Man Called Ove',
      author: 'Fredrik Backman',
      price: 13.50
    )
  end
  let!(:all_quiet_on_the_western_front) do
    Book.create!(
      isbn: '978-0449213940', 
      title: 'All Quiet on the Western Front',
      author: 'Erich Maria Remarque',
      price: 8.99
    )
  end
  it 'allows the user to see a home page at the root' do
    visit '/'

    expect(page).to have_content('Second Treasures Bookstore')
    expect(page).to have_content('Our Favorite Books:')

    within '#recommended-book-list' do
      expect(page).to have_content('A Man Called Ove')
      expect(page).to have_content('Fredrik Backman')
      expect(page).to have_content('$13.50')
      expect(page).to have_content('9781473616349')

      expect(page).to have_content('All Quiet on the Western Front')
      expect(page).to have_content('Erich Maria Remarque')
    end
  end
end 