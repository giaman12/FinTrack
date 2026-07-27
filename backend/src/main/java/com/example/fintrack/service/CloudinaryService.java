package com.example.fintrack.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    public record UploadedImage(String publicId, String secureUrl) {
    }

    // Upload avatar len Cloudinary va tra ve public_id + secure_url.
    UploadedImage uploadAvatarImage(MultipartFile file);
}
