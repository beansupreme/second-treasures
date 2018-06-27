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
  end
end