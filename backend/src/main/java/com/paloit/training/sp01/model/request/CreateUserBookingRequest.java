package com.paloit.training.sp01.model.request;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateUserBookingRequest {
    private UUID roomId;
    private String startTime;
    private String endTime;
}
