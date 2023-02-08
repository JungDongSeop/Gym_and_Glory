package com.backend.db.exception;

public class NoGameStartException extends RuntimeException{

    public NoGameStartException(String message) {
        super(message);
    }
}
