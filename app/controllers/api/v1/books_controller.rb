module Api 
  module V1
    class BooksController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :set_book, only: [:update, :destroy]
      rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

      def index
        render json: Book.all
      end

      def create
        @book = Book.new(book_params)
        if @book.save
          render status: :created, json: @book
        else
          render json: @book.errors.full_messages, status: :unprocessable_entity 
        end
      end

      def update
        if @book.update(book_params)
          render json: @book, status: :ok
        else
          render json: @book.errors.full_messages, status: :unprocessable_entity
        end
      end

      def destroy
        @book.destroy
        render json: {}, status: :ok
      end

    private
      
      def book_params
        params.require(:book).permit(:title, :author, :price, :isbn, :genre)
      end

      def set_book
        @book = Book.find(params[:id])
      end

      def record_not_found
        render json: {}, status: :not_found
      end
    end
  end
end