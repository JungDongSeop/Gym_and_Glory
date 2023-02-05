package com.backend.db.exception;

public class OutOfCountException extends RuntimeException {

    public OutOfCountException(String message) {
        super(message);
    }
}
