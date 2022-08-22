package com.paloit.training.sp01.exception;

public class BookingAlreadyExistsException extends RuntimeException{

    public BookingAlreadyExistsException(String msg) {
        super(msg);
    }
}
