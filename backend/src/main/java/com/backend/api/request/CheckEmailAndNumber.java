package com.backend.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CheckEmailAndNumber {
    private String email;
    private String telNumber;
}
