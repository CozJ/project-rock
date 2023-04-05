export const getTommorow = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);
    return today;
};

export const getToday = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 0);
    return today;
};

export const getAWeekAgo = () => {
    const today = getToday();
    today.setDate(today.getDate() - 7);
    return today;
};

export const getAMonthAgo = () => {
    const today = getToday();
    today.setMonth(today.getMonth() - 1);
    return today;
}

export const getThreeMonthsAgo = () => {
    const today = getToday();
    today.setMonth(today.getMonth() - 3);
    return today;
}

export const getSixMonthsAgo = () => {
    const today = getToday();
    today.setMonth(today.getMonth() - 6);
    return today;
}

export const getAYearAgo = () => {
    const today = getToday();
    today.setFullYear(today.getFullYear() - 1);
    return today;
}