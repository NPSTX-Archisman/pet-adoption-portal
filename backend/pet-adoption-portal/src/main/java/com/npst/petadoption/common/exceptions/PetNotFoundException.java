package com.npst.petadoption.common.exceptions;

public class PetNotFoundException extends RuntimeException {
    public PetNotFoundException(String message) {
        super(message);
    }
}
