package com.vintagemarket.backend.service;

import com.vintagemarket.backend.dto.LoginRequest;
import com.vintagemarket.backend.dto.LoginResponse;
import com.vintagemarket.backend.dto.SignUpRequest;
import com.vintagemarket.backend.dto.SignUpResponse;
import com.vintagemarket.backend.entity.User;
import com.vintagemarket.backend.exception.DuplicateEmailException;
import com.vintagemarket.backend.exception.InvalidCredentialsException;
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
            throw new DuplicateEmailException("이미 가입된 이메일입니다.");
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

    public LoginResponse login(LoginRequest request) {
        User user = authRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("이메일 또는 비밀번호가 일치하지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        return new LoginResponse(user.getId(), user.getEmail(), user.getNickname());
    }
}
