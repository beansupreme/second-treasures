require 'rails_helper'

def login_user(user)
  within '#new_user' do
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
  end

  click_button 'Log in'
end

describe 'managing books', js: true do
  let!(:a_man_called_ove) do
    Book.create!(
      isbn: '9781473616349', 
      title: 'A Man Called Ove',
      author: 'Fredrik Backman',
      price: 13.51
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

  let!(:jill) { User.create(email: 'jill@second-treasures.com', password: 'Password!') }

  it 'requires a user to be logged in' do
    visit '/books' 

    expect(page).to have_content 'Log in'

    login_user(jill)

    expect(page).to have_content 'Listing Books'
  end


  it 'allows the user to manage books' do
    # Viewing books

    visit '/users/sign_in'

    login_user(jill)

    visit '/books'

    contacts_table = find(:table, 'Recommended Books')

    expect(contacts_table).to have_table_row(
      'Title' => 'A Man Called Ove','Author' => 'Fredrik Backman',
      'Price' => '$13.51',  'ISBN' => '9781473616349'
    )

    expect(contacts_table).to have_table_row(
      'Title' => 'All Quiet on the Western Front', 'Author' => 'Erich Maria Remarque',
      'Price' => '$8.99', 'ISBN' => '978-0449213940'
    )

    # Adding a new book
    within('#new-book-form') do
      fill_in 'Title', with: ''
      fill_in 'Author', with: 'George Orwell'
      fill_in 'Price', with: '13.99'
      fill_in 'ISBN', with: '978-0449213888'
      click_on 'Save'
    end

    expect(page).to have_content 'Title can\'t be blank'

    within('#new-book-form') do
      fill_in 'Title', with: '1984'
      click_on 'Save'
    end

    
    expect(contacts_table).to have_table_row(
      'Title' => '1984', 'Author' => 'George Orwell',
      'Price' => '13.99', 'ISBN' => '978-0449213888'
    )

    new_book = Book.find_by_title('1984')
    expect(new_book).to be_present

    # Deleting a book

    ove_book_id = a_man_called_ove.id
    ove_row = find(:table_row, {"Title" => "A Man Called Ove"}, {})
    within(ove_row) do
      click_on 'Delete'
    end

    
    expect(page).to have_content "Book with id #{ove_book_id} was deleted"

    expect(page).not_to have_content('A Man Called Ove')

    expect(Book.find_by_id(ove_book_id)).to be_nil
  end
end