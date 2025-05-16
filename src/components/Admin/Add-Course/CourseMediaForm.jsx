import { Image, Play } from "lucide-react"

const CourseMediaForm = ({ courseData, handleFileChange, errors }) => {
  return (
    <div className="space-y-6">
      <h4 className="text-2xl font-semibold mb-6">Courses Media</h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course cover image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Image className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="course_banner_image"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="course_banner_image"
                  name="course_banner_image"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
        {courseData.course_banner_image && (
          <p className="mt-2 text-sm text-gray-500">Selected file: {courseData.course_banner_image.name}</p>
        )}
        {errors.courseBannerImage && <p className="mt-2 text-sm text-red-600">{errors.courseBannerImage}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course Intro Video (MP4)</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Play className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="course_intro_video"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="course_intro_video"
                  name="course_intro_video"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".mp4"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">MP4 up to 50MB</p>
          </div>
        </div>
        {courseData.course_intro_video && (
          <p className="mt-2 text-sm text-gray-500">Selected file: {courseData.course_intro_video.name}</p>
        )}
        {errors.courseIntroVideo && <p className="mt-2 text-sm text-red-600">{errors.courseIntroVideo}</p>}
      </div>
    </div>
  )
}

export default CourseMediaForm

