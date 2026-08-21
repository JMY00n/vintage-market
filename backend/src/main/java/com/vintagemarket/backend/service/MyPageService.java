package com.vintagemarket.backend.service;

import com.vintagemarket.backend.dto.UserResponse;
import com.vintagemarket.backend.dto.UserUpdateRequest;
import com.vintagemarket.backend.entity.User;
import com.vintagemarket.backend.exception.DuplicateEmailException;
import com.vintagemarket.backend.exception.ForbiddenException;
import com.vintagemarket.backend.exception.UserNotFoundException;
import com.vintagemarket.backend.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final AuthRepository authRepository;

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getNickname(),
                user.getPhone(),
                user.getProfileImageUrl(),
                user.getRole().name()
        );
    }

    public UserResponse getUser(Long id) {
        User user = authRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));

        return toResponse(user);
    }

    public UserResponse update(Long id, UserUpdateRequest request, Long requestUserId) {
        User user = authRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));

        if (!user.getId().equals(requestUserId)) {
            throw new ForbiddenException("본인 정보만 수정 가능합니다.");
        }

        if (!user.getEmail().equals(request.getEmail())
            && authRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("이미 사용 중인 이메일입니다.");
        }

        user.updateProfile(request.getEmail(), request.getNickname(), request.getPhone());

        return toResponse(user);

    }
}
