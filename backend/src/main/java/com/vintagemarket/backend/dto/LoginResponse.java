package com.vintagemarket.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    Long id;
    String email;
    String nickname;
}
