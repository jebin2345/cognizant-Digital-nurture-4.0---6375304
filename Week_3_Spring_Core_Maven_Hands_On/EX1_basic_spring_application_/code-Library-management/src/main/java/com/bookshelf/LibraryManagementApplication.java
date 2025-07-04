package com.bookshelf;

import com.bookshelf.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication
{
    public static void main(String[] args) {
        // Load Spring context from XML config
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        // Get the BookService bean from Spring
        BookService bookService = (BookService) context.getBean("bookService");

        // Call a method to simulate adding a book
        bookService.addBook();
    }
}
