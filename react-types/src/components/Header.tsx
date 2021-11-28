import React, { ReactElement } from "react";

const Header = ({ courseName }: { courseName: string }): ReactElement => {
  return <h1>{courseName}</h1>;
};

export default Header;
