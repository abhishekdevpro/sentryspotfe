import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Constant } from "@/utils/constant/constant";


function Jobreferral() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem(Constant.USER_TOKEN);

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/add-referral",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Referral added successfully!");
        reset();
      } else {
        toast.error("Failed to add referral. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
     

      <div className="page-content bg-white">
        <div className="content-block py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
             

              <div className="flex-1 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold uppercase mb-6">Add Referral</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block font-medium text-sm mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full border px-3 py-2 rounded ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block font-medium text-sm mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone number must be exactly 10 digits",
                        },
                      })}
                      maxLength="10"
                      inputMode="numeric"
                      className={`w-full border px-3 py-2 rounded ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block font-medium text-sm mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      className={`w-full border px-3 py-2 rounded ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Remark Field */}
                  <div>
                    <label htmlFor="remark" className="block font-medium text-sm mb-1">
                      Remark
                    </label>
                    <textarea
                      id="remark"
                      {...register("remark", { required: "Remark is required" })}
                      className={`w-full border px-3 py-2 rounded h-24 resize-none ${
                        errors.remark ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.remark && (
                      <p className="text-red-500 text-sm mt-1">{errors.remark.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}

export default Jobreferral;
