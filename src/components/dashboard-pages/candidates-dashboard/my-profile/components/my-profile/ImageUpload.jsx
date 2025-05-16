import React, { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';

const ImageUpload = ({ profileData, setValue, register }) => {
  const [previewImage, setPreviewImage] = useState(null);
  
  useEffect(() => {
    // Register the photo_upload field with react-hook-form
    register('photo_upload');
    
    // Set initial value if profileData has a photo
    if (profileData?.photo) {
      const imageUrl = `https://api.sentryspot.co.uk${profileData.photo}`;
      console.log('Setting initial image URL:', imageUrl);
      setPreviewImage(imageUrl);
      setValue('photo_upload', null); // Start with null as we don't need to re-upload existing photos
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
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = (e) => {
    e.preventDefault();
    setPreviewImage(null);
    setValue('photo_upload', null);
  };

  // Debug log to check current state
  console.log('Current profileData:', profileData);
  console.log('Current previewImage:', previewImage);
  
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
                  onError={(e) => {
                    console.error('Image failed to load:', previewImage);
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=Error+Loading+Image';
                  }}
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