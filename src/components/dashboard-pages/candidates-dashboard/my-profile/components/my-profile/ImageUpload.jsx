import React, { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';

const ImageUpload = ({ profileData, setValue, register }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Register the photo_upload field with react-hook-form
    register('photo_upload');
    
    // Set initial value if profileData has a photo
    if (profileData?.photo) {
      try {
        console.log('Setting initial image URL:', profileData.photo);
        setPreviewImage(profileData.photo);
        setValue('photo_upload', null); // Start with null as we don't need to re-upload existing photos
        setImageError(false);
      } catch (error) {
        console.error('Error setting initial image:', error);
        setImageError(true);
      }
    }
  }, [register, setValue, profileData]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue('photo_upload', file);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = (e) => {
    e.preventDefault();
    setPreviewImage(null);
    setValue('photo_upload', null);
    setImageError(false);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', previewImage);
    setImageError(true);
    e.target.onerror = null;
    // Use a base64 encoded SVG as fallback
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvZmlsZSBJbWFnZTwvdGV4dD48L3N2Zz4=';
  };

  // Debug logs
  useEffect(() => {
    console.log('Profile Data in ImageUpload:', profileData);
    console.log('Preview Image:', previewImage);
    console.log('Image Error:', imageError);
  }, [profileData, previewImage, imageError]);
  
  return (
    <div className="form-group col-lg-6 col-md-12 flex justify-center">
      <div className="flex flex-col items-center w-full max-w-sm p-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer w-full h-full flex items-center justify-center"
              aria-label="Upload profile picture"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <Camera className="w-10 h-10 text-gray-400" />
              )}
            </label>
          </div>
          
          {previewImage && (
            <button
              onClick={handleRemoveImage}
              type="button" 
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
        
        <label
          htmlFor="imageUpload"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
        >
          {previewImage ? 'Change Picture' : 'Add Picture'}
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;