package com.paloit.training.sp01.exception;

public class NotAuthorizedException extends RuntimeException{
    public NotAuthorizedException(String msg) {
        super(msg);
    }
}
