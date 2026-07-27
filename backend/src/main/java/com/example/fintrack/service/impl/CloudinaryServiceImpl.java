package com.example.fintrack.service.impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.fintrack.service.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public UploadedImage uploadAvatarImage(MultipartFile file) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "fintrack/avatars",
                            "resource_type", "image"));

            String publicId = (String) result.get("public_id");
            String secureUrl = (String) result.get("secure_url");

            return new UploadedImage(publicId, secureUrl);
        } catch (IOException exception) {
            throw new RuntimeException("Khong the upload avatar len Cloudinary", exception);
        }
    }

}
