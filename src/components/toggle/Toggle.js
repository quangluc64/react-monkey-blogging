import React, { useState } from "react";

const Toggle = (props) => {
  const {on, onClick, ...rest} = props;
  // const [toggle, setToggle] = useState(false);
  // console.log("toggle ~", toggle);
  // const handleToggle = () => {
  //   setToggle(!toggle);
  // };
  return (
    <label>
      <input
        type="checkbox"
        className="hidden-input"
        checked={on}
        onChange={() => {}}
        onClick={onClick}
      />
      <div
        className={`relative p-1 w-[80px] h-[42px] rounded-3xl ${
          on ? "bg-sky-600" : "bg-slate-300"
        }`}
      >
        <div
          className={`transition-all duration-300 ease-in-out absolute ${
            on ? "translate-x-[38px]" : ""
          } w-[34px] h-[34px] rounded-full bg-white `}
        ></div>
      </div>
    </label>
  );
};
export default Toggle;
