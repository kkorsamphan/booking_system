package com.paloit.training.sp01.exception;

public class UserAlreadyExistsException extends RuntimeException{

    public UserAlreadyExistsException(String msg) {
        super(msg);
    }
}
