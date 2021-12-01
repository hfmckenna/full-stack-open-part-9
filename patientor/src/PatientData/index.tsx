import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientData = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  console.log(patients);
  const [patient, setPatient] = useState<Patient>();
  const [icon, setIcon] = useState<SemanticICONS>("spinner");

  const fetchPatient = async (fullPatientId: string): Promise<void> => {
    const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${fullPatientId}`
    );
    setPatient(data);
    dispatch({ type: "ADD_PATIENT", payload: data });
  };

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
        </div>
      )}
    </div>
  );
};

export default PatientData;
