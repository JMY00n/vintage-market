package com.vintagemarket.backend.service;

import com.vintagemarket.backend.dto.SignUpRequest;
import com.vintagemarket.backend.dto.SignUpResponse;
import com.vintagemarket.backend.entity.User;
import com.vintagemarket.backend.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;

    public SignUpResponse signUp(SignUpRequest request) {
        if (authRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("이미 가입된 이메일입니다.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .role(User.Role.valueOf(request.getRole()))
                .phone(request.getPhone())
                .build();
        User saved = authRepository.save(user);

        return new SignUpResponse(saved.getId(), saved.getEmail(), saved.getNickname());
    }
}
