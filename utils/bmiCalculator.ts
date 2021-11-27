interface CalculateValues {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = (weight / height / height) * 10000;
  const bmiValues = {
    "Underweight (Severe thinness)": {
      value: 16,
      title: "Underweight (Severe thinness) ",
    },
    "Underweight (Moderate thinness)": {
      value: 16.9,
      title: "Underweight (Moderate thinness) ",
    },
    "Underweight (Mild thinness)": {
      value: 18.4,
      title: "Underweight (Mild thinness)",
    },
    "Normal range": {
      value: 24.9,
      title: "Normal range",
    },
    "Overweight (Pre-obese)": {
      value: 29.9,
      title: "Overweight (Pre-obese)",
    },
    "Obese (Class I)": {
      value: 34.9,
      title: "Obese (Class II) ",
    },
    "Obese (Class II)": {
      value: 39.9,
      title: "Obese (Class II)",
    },
    "Obese (Class III)": {
      value: 9999,
      title: "Obese (Class III)",
    },
  };
  const findRelevantBmi = Object.values(bmiValues).find(
    (bmiValue: { value: number; title: string }) => bmi <= bmiValue.value
  );
  if (findRelevantBmi) {
      console.log(findRelevantBmi.title);
  }
};

const parseArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (isNaN(height)) throw new Error("Target height must be a number");
  if (isNaN(weight)) throw new Error("Target weight must be a number");

  return {
    height,
    weight,
  };
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error);
  }
}
