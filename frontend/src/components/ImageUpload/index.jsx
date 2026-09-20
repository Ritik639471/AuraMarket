import React, { useState, useRef } from 'react';
import { Box, Button, Typography, IconButton, CircularProgress, TextField } from '@mui/material';
import { CloudUpload, Delete, Star, AddLink, Image as ImageIcon } from '@mui/icons-material';

// Cloudinary configuration (can be configured via env or used unsigned)
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
const API_URL = import.meta.env.VITE_API_URL || '';

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=600';

const ImageUpload = ({ images = [], onChange, multiple = true, label = "Product Images" }) => {
    const [uploading, setUploading] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Convert existing images prop into a clean array
    const imageList = Array.isArray(images)
        ? images
        : typeof images === 'string' && images.trim()
            ? images.split(',').map(s => s.trim()).filter(Boolean)
            : [];

    const handleUploadFiles = async (files) => {
        if (!files || files.length === 0) return;
        setUploading(true);

        const newUploadedUrls = [];

        for (const file of Array.from(files)) {
            try {
                // If Cloudinary preset is configured on frontend, upload directly to Cloudinary CDN
                if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                        method: 'POST',
                        body: formData
                    });
                    const data = await res.json();
                    if (data.secure_url) {
                        newUploadedUrls.push(data.secure_url);
                        continue;
                    }
                }

                // Fallback: Upload to backend /api/upload using Base64 data URL
                const base64 = await toBase64(file);
                const res = await fetch(`${API_URL}/api/upload`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64, filename: file.name })
                });
                const data = await res.json();
                if (data.url) {
                    newUploadedUrls.push(data.url);
                }
            } catch (err) {
                console.error("Failed to upload image file:", err);
            }
        }

        if (newUploadedUrls.length > 0) {
            if (multiple) {
                onChange([...imageList, ...newUploadedUrls]);
            } else {
                onChange(newUploadedUrls[0]);
            }
        }
        setUploading(false);
    };

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleAddUrl = () => {
        if (!urlInput.trim()) return;
        if (multiple) {
            onChange([...imageList, urlInput.trim()]);
        } else {
            onChange(urlInput.trim());
        }
        setUrlInput('');
    };

    const handleRemove = (index) => {
        const updated = imageList.filter((_, i) => i !== index);
        onChange(multiple ? updated : (updated[0] || ''));
    };

    const handleSetCover = (index) => {
        if (index === 0) return;
        const cover = imageList[index];
        const rest = imageList.filter((_, i) => i !== index);
        onChange([cover, ...rest]);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, my: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333' }}>
                {label} {multiple && `(${imageList.length} uploaded)`}
            </Typography>

            {/* Drop Zone */}
            <Box
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleUploadFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                    border: '2px dashed',
                    borderColor: isDragging ? '#ff5252' : '#cbd5e1',
                    borderRadius: '12px',
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragging ? '#fff5f5' : '#fafbfc',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        borderColor: '#ff5252',
                        backgroundColor: '#fff8f8'
                    }
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple={multiple}
                    style={{ display: 'none' }}
                    onChange={(e) => handleUploadFiles(e.target.files)}
                />
                {uploading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={28} sx={{ color: '#ff5252' }} />
                        <Typography variant="body2" color="text.secondary">Uploading image to secure storage...</Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <CloudUpload sx={{ fontSize: 36, color: '#ff5252' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2b3445' }}>
                            Click to browse or Drag & Drop images here
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Supports PNG, JPG, WebP, GIF (Auto-saved & permanent)
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Alternative: Direct Image URL input */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Or paste an image web link (https://...)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
                />
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddLink />}
                    onClick={handleAddUrl}
                    sx={{ textTransform: 'none', px: 2, borderColor: '#ddd', color: '#555' }}
                >
                    Add Link
                </Button>
            </Box>

            {/* Thumbnail Gallery Preview */}
            {imageList.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
                    {imageList.map((url, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                position: 'relative',
                                width: 90,
                                height: 90,
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: idx === 0 ? '2px solid #ff5252' : '1px solid #e2e8f0',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                group: 'thumb'
                            }}
                        >
                            <img
                                src={url}
                                alt={`upload-${idx}`}
                                onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />

                            {/* Badge for Cover Image */}
                            {idx === 0 && (
                                <Box sx={{
                                    position: 'absolute', top: 3, left: 3,
                                    backgroundColor: '#ff5252', color: 'white',
                                    fontSize: '9px', fontWeight: 800, px: 0.8, py: 0.2,
                                    borderRadius: '4px'
                                }}>
                                    COVER
                                </Box>
                            )}

                            {/* Actions Overlay */}
                            <Box sx={{
                                position: 'absolute', bottom: 0, left: 0, right: 0,
                                display: 'flex', justifyContent: 'space-between',
                                backgroundColor: 'rgba(0,0,0,0.6)', p: 0.2
                            }}>
                                {multiple && idx !== 0 && (
                                    <IconButton
                                        size="small"
                                        title="Make Cover Image"
                                        onClick={(e) => { e.stopPropagation(); handleSetCover(idx); }}
                                        sx={{ color: '#fbbf24', p: 0.5 }}
                                    >
                                        <Star sx={{ fontSize: 16 }} />
                                    </IconButton>
                                )}
                                <IconButton
                                    size="small"
                                    title="Delete"
                                    onClick={(e) => { e.stopPropagation(); handleRemove(idx); }}
                                    sx={{ color: '#fff', ml: 'auto', p: 0.5, '&:hover': { color: '#ff5252' } }}
                                >
                                    <Delete sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ImageUpload;
