import React, { ReactElement } from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }): ReactElement => {
  return (
    <div>
        {
            courseParts.map(part => <Part key={part.name} coursePart={part} />)
        }
    </div>
  );
};

export default Content;
