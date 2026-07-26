package com.example.fintrack.service.impl;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.fintrack.dto.request.*;
import com.example.fintrack.dto.response.*;
import com.example.fintrack.entity.*;
import com.example.fintrack.repository.*;
import com.example.fintrack.service.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Đăng ký
    @Override
    public RegisterResponse register(RegisterRequest request) {
        // Kiểm tra đã xác nhận mật khẩu chưa?
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu không khớp");
        }

        // Kiểm tra email đã tồn tại chưa?
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email đã tồn tại");
        }

        // Mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // Tạo đối tượng User
        User newUser = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(encodedPassword)
                .role(Role.USER)
                .status(UserStatus.ACTIVE)
                .provider(AuthProvider.LOCAL)
                .build();

        User savedUser = userRepository.save(newUser);

        // Chuyển đổi sang RegisterResponse để trả về
        return RegisterResponse.builder()
                .id(savedUser.getId())
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .status(savedUser.getStatus())
                .build();
    }

}
