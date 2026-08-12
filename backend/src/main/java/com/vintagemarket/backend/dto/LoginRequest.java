package com.vintagemarket.backend.dto;

import lombok.Getter;

@Getter
public class LoginRequest {
    String email;
    String password;
}
