package com.paloit.training.sp01.model.request;

import lombok.Data;

@Data
public class CreateRoomRequest {
    private Integer size;
    private String name;
}
