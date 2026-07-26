package com.example.fintrack.service;

import com.example.fintrack.dto.response.*;
import com.example.fintrack.dto.request.*;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);
}
