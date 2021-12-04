import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { addPatient, useStateValue } from "../state";
import { Patient, Entry, Diagnosis } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

interface Diagnoses {
  [key: string]: Diagnosis;
}

const PatientData = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnoses>({});
  const [icon, setIcon] = useState<SemanticICONS>("spinner");

  const fetchPatient = async (
    fullPatientId: string
  ): Promise<boolean | void> => {
    try {
      const { data } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${fullPatientId}`
      );
      setPatient(data);
      dispatch(addPatient(data));
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const fetchDiagnosesInfo = async (entries: Entry[]) => {
    const diagnosisInfo = {};
    for (const entry of entries) {
      if (entry.diagnosisCodes) {
        for (const code of entry.diagnosisCodes) {
          try {
            const { data }: {data: Diagnosis} = await axios.get<Diagnosis>(
              `${apiBaseUrl}/diagnoses/${code}`
            );
            (diagnosisInfo as Diagnoses)[code] = data;
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    if (Object.values(diagnosisInfo).length > 0) {
      setDiagnoses(diagnosisInfo);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (patient?.entries) {
      void fetchDiagnosesInfo(patient.entries);
    }
  }, [patient]);

  useEffect(() => {
    switch (patient?.gender) {
      case "male":
        setIcon("man");
        break;
      case "female":
        setIcon("woman");
        break;
      case "other":
        setIcon("non binary transgender");
        break;
      default:
        setIcon("spinner");
    }
  }, [patient?.gender]);

  useEffect(() => {
    const findPatient = Object.values(patients).find(
      (currentPatient: Patient) => currentPatient.id === id
    );
    if (typeof findPatient !== "undefined") {
      setPatient(findPatient);
      if (!findPatient?.ssn || !findPatient?.dateOfBirth) {
        void fetchPatient(id);
      }
    }
  }, [patients]);

  return (
    <div>
      {patient && (
        <div>
          <h2>
            {patient?.name}
            <Icon name={icon} />
          </h2>
          <p>ssn: {patient?.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
          <p>DOB: {patient?.dateOfBirth}</p>
          {patient?.entries && (
            <div>
              <h2>Entries</h2>
              {patient?.entries.map((entry: Entry) => {
                return (
                  <div key={entry.id}>
                    <p>{entry?.date}</p>
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
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientData;
