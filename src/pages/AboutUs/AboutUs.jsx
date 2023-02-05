import React from "react"
import Editor from "../../components/Editor/Editor"

const AboutUs = () => {
  return (
    <>
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            About Us Editor
          </p>
        </div>

        <Editor />
      </div>
    </>
  )
}

export default AboutUs
