package com.paloit.training.sp01.exception;

public class BookingNotFoundException extends RuntimeException{

    public BookingNotFoundException(String msg) {
        super(msg);
    }
}
