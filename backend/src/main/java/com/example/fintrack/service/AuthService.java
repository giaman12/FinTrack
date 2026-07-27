package com.example.fintrack.service;

import com.example.fintrack.dto.response.*;
import com.example.fintrack.dto.request.*;

public interface AuthService {
    UserResponse register(RegisterRequest request);

    UserResponse login(LoginRequest request);
}
