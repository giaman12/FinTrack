package com.example.fintrack.security.oauth2.user;

import java.util.Map;

public class FacebookOAuth2UserInfo implements OAuth2UserInfo {

    private Map<String, Object> attributes;

    public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getImageUrl() {
        // Cấu trúc JSON của Facebook cho 'picture' là: { "picture": { "data": { "url": "..." } } }
        if (attributes.containsKey("picture")) {
            Object picture = attributes.get("picture");
            if (picture instanceof Map) {
                @SuppressWarnings("unchecked")
                Map<String, Object> pictureObj = (Map<String, Object>) picture;
                if (pictureObj.containsKey("data")) {
                    Object data = pictureObj.get("data");
                    if (data instanceof Map) {
                        @SuppressWarnings("unchecked")
                        Map<String, Object> dataObj = (Map<String, Object>) data;
                        if (dataObj.containsKey("url")) {
                            return (String) dataObj.get("url");
                        }
                    }
                }
            }
        }
        return null;
    }
}