import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfilePictureUpload = () => {
  const [logImg, setLogImg] = useState(null);

  const logImgHander = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLogImg(reader.result); // Store the Base64 string of the file
      };
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const resetImage = () => {
    setLogImg(null); // Reset the image to null (default)
  };

  return (
    <div className="form-group col-lg-6 col-md-12 flex justify-center">
      <div>
        <div className="rounded-full border w-32 h-32 flex items-center justify-center">
          <input
            className="uploadButton-input hidden"
            type="file"
            accept="image/*"
            id="upload"
            onChange={logImgHander}
          />
          <label
            className="uploadButton-button cursor-pointer flex items-center justify-center"
            htmlFor="upload"
          >
            {logImg ? (
              <img
                src={logImg}
                alt="Uploaded"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center">
                <i className="fas fa-camera text-6xl"></i>
              </div>
            )}
          </label>
        </div>
        <div className="cursor-pointer bg-blue-800 w-28 mt-2 py-1 ms-2 text-white text-sm text-center rounded-lg">
          Add Picture
        </div>

        {logImg && (
          <button
            type="button"
            onClick={resetImage}
            className="bg-red-500 text-white mt-2 py-1 px-4 rounded-lg text-sm"
          >
            Remove Picture
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload; 