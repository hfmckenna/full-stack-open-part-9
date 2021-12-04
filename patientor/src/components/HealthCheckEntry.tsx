import React from "react";
import { Entry, Diagnoses } from "../types";
import { Icon } from "semantic-ui-react";

const HealthCheckEntry = ({ entry, diagnoses }: {entry: Entry, diagnoses: Diagnoses}) => {
  return (
    <div key={entry.id}>
      <p>{entry?.date} <Icon name={'stethoscope'} /></p>
      <p>{entry?.description}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry?.diagnosisCodes.map((code) => {
            if (diagnoses[code]?.name !== undefined) {
              return (
                <li key={code}>
                  {code}: {diagnoses[code].name}
                </li>
              );
            } else {
              return <li key={code}>{code}</li>;
            }
          })}
        </ul>
      )}
    </div>
  );
};

export default HealthCheckEntry;
