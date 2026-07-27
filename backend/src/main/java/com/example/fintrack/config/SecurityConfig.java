package com.example.fintrack.config;

import com.example.fintrack.security.oauth2.*;
import lombok.*;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final CustomOAuth2UserService customOAuth2UserService;
        private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
        private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
        private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable) // Tắt CSRF cho API
                                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Thêm cấu hình CORS
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Không dùng session
                                .authorizeHttpRequests(authorize -> authorize
                                                .requestMatchers("/api/auth/**", "/oauth2/**", "/login/**").permitAll() 
                                                .anyRequest().authenticated() // Các request khác yêu cầu xác thực
                                )
                                .exceptionHandling(exception -> exception
                                                .authenticationEntryPoint(restAuthenticationEntryPoint)
                                )
                                .oauth2Login(oauth2 -> oauth2
                                                .authorizationEndpoint(authorization -> authorization
                                                                .baseUri("/oauth2/authorization") // URI để bắt đầu luồng OAuth2
                                                )
                                                .userInfoEndpoint(userInfo -> userInfo
                                                                .userService(customOAuth2UserService) // Sử dụng CustomOAuth2UserService để tải thông tin người dùng
                                                )
                                                .successHandler(oAuth2AuthenticationSuccessHandler) // Xử lý thành công OAuth2
                                                .failureHandler(oAuth2AuthenticationFailureHandler) // Xử lý thất bại OAuth2
                                );

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                // Cho phép frontend truy cập
                configuration.setAllowedOrigins(List.of("http://localhost:5173"));
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
                configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
                configuration.setAllowCredentials(true);
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

}