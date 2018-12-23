const logger = () => next => action => {
    console.log(action);
    next(action);
    console.log(action);
};

export default logger;
