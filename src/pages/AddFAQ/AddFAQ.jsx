import { useState } from "react";
import { useForm } from "react-hook-form";
import Editor from "../../components/Editor/Editor";

const MAX_COUNT = 5;

const AddFAQ = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createFAQ = (data) => {};
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add FAQ
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(createFAQ)}
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="question"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Question
            </label>
            <input
              name="question"
              placeholder="Enter question"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("question", { required: true })}
            />
            {errors.question && (
              <p className="text-red-500 font-normal text-sm">
                Question is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="answer"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Answer
            </label>
            <textarea
              name="answer"
              placeholder="Enter answer"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("answer", { required: true })}
            />
            {errors.answer && (
              <p className="text-red-500 font-normal text-sm">
                Answer is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="status"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Status
            </label>
            <select
              name="status"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("status", { required: true })}
            >
              <option value="0">Active</option>
              <option value="1">Deactive</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              onClick={() => handleSubmit(createFAQ)}
              className={`inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 cursor-pointer focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFAQ;
