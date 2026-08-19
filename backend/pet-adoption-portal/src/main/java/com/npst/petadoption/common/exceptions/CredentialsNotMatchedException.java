package com.npst.petadoption.common.exceptions;

public class CredentialsNotMatchedException extends RuntimeException {
    public CredentialsNotMatchedException(String message) {
        super(message);
    }
}
