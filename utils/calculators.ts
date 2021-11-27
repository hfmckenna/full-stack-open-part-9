export const calculateBmi = (height: number, weight: number) => {
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
        return findRelevantBmi.title;
    } else {
        console.log("Some kind of issue!");
        return false;
    }
};

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const exerciseCalculator = (hours: Array<number>, target: number) => {
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