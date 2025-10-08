import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfilePatch } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { Button } from "../../ui/button.jsx"
import PhoneInput from "react-phone-input-2";
export default function UserProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  // Load user info into form when available
  useEffect(() => {
    console.log("User Info from store:", userInfo);
    if (userInfo) {
      const data = userInfo.data || userInfo;
      reset({
        first_name: data?.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [userInfo, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

      if (data.resume_upload && data.resume_upload.length > 0) {
        formData.append("resume_upload", data.resume_upload[0]);
      }

      const updatedData = await dispatch(updateUserProfilePatch(formData)).unwrap();
      console.log(updatedData, "✅ updated data from form");

      if (updatedData.status === "success" || updatedData.code === 200) {
        toast.success(updatedData.message || "Profile updated successfully!");
        navigate("/candidates-dashboard/my-profile");
      } else {
        toast.error(updatedData.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">

      <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Complete Your Profile
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* First Name */}
          <div className="form-group">
            <label className="block mb-1 font-medium">First Name</label>
            <input
              {...register("first_name", { required: "First name is required" })}
              className="w-full px-3 py-2 border rounded-md"
              maxLength={30}
              placeholder="Enter first name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name.message}</p>
            )}

          </div>

          {/* Last Name */}
          <div className="form-group">
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              {...register("last_name", { required: "Last name is required" })}
              className="w-full px-3 py-2 border rounded-md"
              maxLength={30}
              placeholder="Enter last name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group cmpprofile">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          {/* <div className="form-group">
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              inputMode="numeric"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone must be 10 digits",
                },
              })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              placeholder="Enter Phone number"
              className="w-full px-3 py-2 border rounded-md"
              maxLength={10}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div> */}

          <div className="form-group cmpprofile">
            <label className="block mb-1 font-medium">
              Phone Number
            </label>
            <div className="relative">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  validate: (value) => {
                    if (!value) return "Phone number is required";

                    const digitsOnly = value.replace(/\D/g, "");
                    const localNumber = digitsOnly.slice(-10);

                    if (localNumber.length !== 10) {
                      return "Phone number must have exactly 10 digits in the local number";
                    }
                    return true;
                  },
                }}

                render={({ field }) => (
                  <PhoneInput
                    country="in"
                    value={field.value}
                    onChange={(phone) => field.onChange(phone)}
                    inputProps={{ name: "phone", required: true, }}
                    inputStyle={{
                      width: "100%",
                      borderRadius: "6px",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    containerStyle={{ width: "100%" }}
                    buttonStyle={{ border: "#dee2e6" }}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}

            </div>
          </div>


          {/* Resume Upload */}
          <div className="form-group">
            <label className="block mb-1 font-medium">Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("resume_upload")}
              className="w-full"
            />
          </div>

          {/* Submit */}
          <div className="col-span-1 sm:col-span-2">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
