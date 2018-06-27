# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
books = [
  { 
    isbn: '978-0440238133', 
    title: 'The Golden Compass',
    author: 'Philip Pullman',
    price: 14.96
  } ,
  {
    isbn: '978-0060850524', 
    title: 'Brave New World',
    author: 'Aldous Huxley',
    price: 16.31
  },
  {
    isbn: '978-0449213940', 
    title: 'All Quiet on the Western Front',
    author: 'Erich Maria Remarque',
    price: 8.99
  },
  {
    isbn: '9781473616349', 
    title: 'A Man Called Ove',
    author: 'Fredrik Backman',
    price: 13.50
  },
]

books.each do |book_data|
  Book.create(book_data)
end