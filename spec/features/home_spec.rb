require 'rails_helper'

describe 'visiting the home page', js: true do
  it 'allows the user to see a home page at the root' do
    visit '/'

    expect(page).to have_content('Second Treasures Bookstore')
    expect(page).to have_content('Our recommended books:')
  end
end 