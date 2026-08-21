package com.vintagemarket.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateRequest {
    private String email;
    private String nickname;
    private String phone;
}
