package com.npst.petadoption.common.exceptions;

public class MethodArgumentNotValidException extends RuntimeException {
    public MethodArgumentNotValidException(String message) {
        super(message);
    }
}
