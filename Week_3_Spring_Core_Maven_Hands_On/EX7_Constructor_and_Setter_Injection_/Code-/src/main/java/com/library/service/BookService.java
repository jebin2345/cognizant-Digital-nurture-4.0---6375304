package com.library.service;

import com.library.repository.BookRepository;

public class BookService {

    private BookRepository bookRepository;
    private LoggerService loggerService;

    // Constructor injection
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Setter injection
    public void setLoggerService(LoggerService loggerService) {
        this.loggerService = loggerService;
    }

    public void issueBook() {
        System.out.println("BookService: Issuing a book...");
        bookRepository.save();
        if (loggerService != null) {
            loggerService.log("Book issued successfully.");
        }
    }
}
