package com.confab.Social.Responses;

import lombok.Data;

@Data
public class ApiResponse {
    private String message;
    private boolean status;

    public ApiResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }
}

