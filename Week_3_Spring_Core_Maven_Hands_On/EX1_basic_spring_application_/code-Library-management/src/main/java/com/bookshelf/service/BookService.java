package com.bookshelf.service;

import com.bookshelf.repository.BookRepository;

public class BookService {

    private BookRepository bookRepository;

    // Setter for Spring to inject BookRepository
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void addBook() {
        System.out.println("BookService: Delegating to repository...");
        bookRepository.saveBook();
    }
}
