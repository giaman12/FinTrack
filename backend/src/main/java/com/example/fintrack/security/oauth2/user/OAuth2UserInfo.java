package com.example.fintrack.security.oauth2.user;

import java.util.Map;

public interface OAuth2UserInfo {
    Map<String, Object> getAttributes();
    String getId();
    String getName();
    String getEmail();
    String getImageUrl();
}