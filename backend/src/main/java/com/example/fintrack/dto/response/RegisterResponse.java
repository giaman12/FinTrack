package com.example.fintrack.dto.response;

import lombok.*;
import com.example.fintrack.entity.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class RegisterResponse {
    private Integer id;
    private String fullName;
    private String email;
    private String phone;
    private String avatar;
    private UserStatus status;
}
