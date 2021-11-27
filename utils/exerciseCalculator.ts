interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseCalculator = (hours: Array<number>, target: number) => {
    const periodLength: number = hours.length;
    const trainingDays: number = hours.filter(hour => hour > 0).length;
    const average: number = hours.reduce((prevHour, hour) => prevHour + hour) / periodLength;
    const success = average > target;
    const rating = Math.round(average);
    let ratingDescription = '';
    const relativeDifference = average / target;
    if (relativeDifference < 1) {
        ratingDescription = "Not bad, could do better"
    } else if (relativeDifference === 1) {
        ratingDescription = "Nailed it"
    } else if (relativeDifference > 1) {
        ratingDescription = "Great, keep it going!"
    } else if (relativeDifference > 2) {
        ratingDescription = "Beast mode!"
    }
    const result: Result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
    return result;
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))