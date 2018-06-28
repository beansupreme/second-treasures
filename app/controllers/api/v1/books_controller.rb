module Api 
  module V1
    class BooksController < ApplicationController
      protect_from_forgery with: :null_session
      def index
        render json: Book.all
      end

      def create
        @book = Book.new(book_params)
        if @book.save
          render status: :created, json: @book
        else
          render json: @contact.errors.full_messages, status: :unprocessable_entity 
        end
      end

      private
      
        def book_params
          params.require(:book).permit(:title, :author, :price, :isbn)
        end
    end
  end
end