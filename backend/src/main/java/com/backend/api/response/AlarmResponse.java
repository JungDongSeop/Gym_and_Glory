package com.backend.api.response;

public class AlarmResponse {
    private String message;

    public AlarmResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}