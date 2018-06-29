class Book < ApplicationRecord
  validates_presence_of :title
  validates_length_of :isbn, :maximum => 25, :allow_blank => true
  validates_length_of :genre, :maximum => 100, :allow_blank => true
  validates_length_of :author, :maximum => 100, :allow_blank => true
  validates_length_of :title, :maximum => 200, :allow_blank => true
end