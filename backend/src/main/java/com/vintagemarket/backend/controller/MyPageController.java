package com.vintagemarket.backend.controller;

import com.vintagemarket.backend.dto.UserResponse;
import com.vintagemarket.backend.dto.UserUpdateRequest;
import com.vintagemarket.backend.service.MyPageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return myPageService.getUser(id);
    }

    @PutMapping("/{id}")
    public UserResponse update(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request,
            @AuthenticationPrincipal Long userId
            ) {
        return myPageService.update(id, request, userId);
    }
}
