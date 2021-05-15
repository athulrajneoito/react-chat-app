import React from "react";
import { useHistory } from "react-router";

const Header = ({ heading }: any) => {
  const history = useHistory();
  return (
    <div className="flex justify-between items-center">
      <h1 className="uppercase text-3xl p-5">{heading}</h1>
      <button className="px-4 py-2 bg-red-600 rounded h-auto " type="submit" onClick={()=>history.push('/')}>Leave</button>
    </div>
  );
};

export default Header;
