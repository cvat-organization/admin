import React from "react";

type DropDownProps = {
  showDropDown: boolean;
};

const DropDown: React.FC<DropDownProps> = ({
  showDropDown,
}: DropDownProps): JSX.Element => {
  return (
    <div className={showDropDown ? "dropdown" : "dropdown active"}>
      <p>Profile</p>
      <p>Logout</p>
    </div>
  );
};

export default DropDown;
