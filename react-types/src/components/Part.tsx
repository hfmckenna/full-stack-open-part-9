import React, { ReactElement } from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }): ReactElement => {
  const { name, exerciseCount } = coursePart;
  let description, groupProjectCount, exerciseSubmissionLink, requirements;

  switch (coursePart.type) {
    case "normal":
      description = coursePart.description;
      break;
    case "groupProject":
      groupProjectCount = coursePart.groupProjectCount;
      break;
    case "submission":
      exerciseSubmissionLink = coursePart.exerciseSubmissionLink;
      break;
    case "special":
      requirements = coursePart.requirements;
      break;
    default:
      return assertNever(coursePart);
  }

  return (
    <div>
      <h3>
        {name} {exerciseCount}
      </h3>
      {description && <p>{description}</p>}
      {groupProjectCount && <p>Number of exercises: {groupProjectCount}</p>}
      {exerciseSubmissionLink && <p>Submit to {exerciseSubmissionLink}</p>}
      {requirements && (
        <p>Required Skills: {requirements.map((skill) => skill)}</p>
      )}
    </div>
  );
};

export default Part;
