import React, { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
const EntryForm = ({ id }: { id: string }) => {
  const [formState, setFormState] = useState({
    description: "",
    date: "",
    specialist: "",
    dischargeDate: "",
    dischargeCriteria: "",
  });

  const handleChange = (e: any) => {
    const eventTarget = e.target as HTMLInputElement;

    const targetName = eventTarget.name;
    const targetValue = eventTarget.value;
    setFormState({
      ...formState,
      [targetName]: targetValue,
    });
  };

  const handleSubmit = async () => {
    await axios.post(`${apiBaseUrl}/patients/${id}/entries`, {
      description: formState.description,
      type: "Hospital",
      date: formState.date,
      specialist: formState.specialist,
      discharge: {
        date: formState.dischargeDate,
        criteria: formState.dischargeCriteria,
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={() => {
          void handleSubmit();
        }}
      >
        <input
          name="description"
          onChange={handleChange}
          placeholder="description"
          value={formState?.description ?? ""}
          type="text"
        />
        <input
          name="date"
          onChange={handleChange}
          placeholder="date"
          type="text"
          value={formState?.date ?? ""}
        />
        <input
          name="specialist"
          onChange={handleChange}
          placeholder="specialist"
          type="text"
          value={formState?.specialist ?? ""}
        />
        <input
          name="dischargeDate"
          onChange={handleChange}
          placeholder="dischargeDate"
          type="text"
          value={formState?.dischargeDate ?? ""}
        />
        <input
          name="dischargeCriteria"
          onChange={handleChange}
          placeholder="dischargeCriteria"
          type="text"
          value={formState?.dischargeCriteria ?? ""}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EntryForm;
