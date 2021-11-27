import { exerciseCalculator } from "./utils/calculators";

interface CalculateValues {
  hours: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (isNaN(Number(args[2]))) throw new Error("Target value must be a number");
  const target = Number(args[2]);

  const hours = args.slice(3).map((hour) => {
    const number = Number(hour);
    if (isNaN(number)) {
      throw new Error("All hour values must be numbers");
    } else {
      return number;
    }
  });

  return {
    hours,
    target,
  };
};

try {
  const { hours, target } = parseArguments(process.argv);
  exerciseCalculator(hours, target);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error);
  }
}
