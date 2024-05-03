export const getKey = (value) => {
    return `${new Date().getTime()}-${value}`;
};
