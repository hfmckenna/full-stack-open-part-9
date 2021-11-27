interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculateValues {
  hours: Array<number>;
  target: number;
}

const exerciseCalculator = (hours: Array<number>, target: number) => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter((hour) => hour > 0).length;
  const average: number =
    hours.reduce((prevHour, hour) => prevHour + hour) / periodLength;
  const success = average > target;
  const rating = Math.round(average);
  let ratingDescription = "";
  const relativeDifference = average / target;
  if (relativeDifference < 1) {
    ratingDescription = "Not bad, could do better";
  } else if (relativeDifference === 1) {
    ratingDescription = "Nailed it";
  } else if (relativeDifference > 1) {
    ratingDescription = "Great, keep it going!";
  } else if (relativeDifference > 2) {
    ratingDescription = "Beast mode!";
  }
  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  console.log(result);
};

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
    target
  };
};


try {
  const {hours, target} = parseArguments(process.argv);
  exerciseCalculator(hours, target);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error);
  }
}
