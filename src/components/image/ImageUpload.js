import React, { Fragment } from "react";
import PropTypes from "prop-types";
const ImageUpload = (props) => {
  const {
    name = "",
    className = "",
    onChange = () => {},
    image = "",
    onDelete = () => {},
    deleteButtonPosition = "top-right",
    ...rest
  } = props;

  const inputId = "image-upload"; // id cố định hoặc random

  return (
    <div
      className={`relative w-full min-h-[200px] bg-slate-200 rounded-xl flex items-center justify-center overflow-hidden ${className}`}
    >
      <input
        id={inputId}
        type="file"
        name={name}
        onChange={onChange}
        {...rest}
        className="hidden-input"
      />
      <label
        htmlFor={inputId}
        className="absolute inset-0 cursor-pointer z-0"
      ></label>

      {image ? (
        <Fragment>
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={onDelete}
            className={`${
              deleteButtonPosition === "center"
                ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : "top-2 right-2"
            } absolute z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/50 text-sky-600 shadow`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Fragment>
      ) : (
        <div className="z-10 flex flex-col items-center justify-center pointer-events-none">
          <img
            src={`${process.env.PUBLIC_URL}/img-upload.png`}
            alt=""
            className="max-w-[80px]"
          />
          <span className="mt-1 font-medium">Choose photo</span>
        </div>
      )}
    </div>
  );
};
ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  image: PropTypes.string,
};

export default ImageUpload;
