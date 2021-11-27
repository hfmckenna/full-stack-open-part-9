import { calculateBmi } from "./utils/calculators";

interface CalculateValues {
  height: number;
  weight: number;
}

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
