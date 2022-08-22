package com.paloit.training.sp01.exception;

public class RoomNotFoundException extends RuntimeException{

    public RoomNotFoundException(String msg) {
        super(msg);
    }
}
