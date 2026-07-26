package com.example.fintrack.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;
    private String avatar;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider provider;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.USER;

    // Số lần đăng nhập thất bại
    @Column(name = "failed_login_attempts")
    private Integer failedLoginAttempts;

    // Thời gian khóa tài khoản
    @Column(name = "lock_time")
    private LocalDateTime lockTime;

    // Token dùng khi quên mật khẩu
    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "reset_token_expiration")
    private LocalDateTime resetTokenExpiration;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
