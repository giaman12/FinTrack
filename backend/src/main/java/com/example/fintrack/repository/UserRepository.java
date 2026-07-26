package com.example.fintrack.repository;

import java.util.*;

import org.springframework.data.jpa.repository.*;

import com.example.fintrack.entity.*;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByResetToken(String token);

    List<User> findByRole(Role role);
}
