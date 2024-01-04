const ERRORTYPES = {
  ERROR: "Error",
  WARN: "Warn"
};

const errorHandler = (errorType, errorMessage, errorCode) => {
  if (errorType === ERRORTYPES.ERROR){
    console.error(`[${errorType}${errorCode ? ": " + errorCode : ""}]: ${errorMessage}`);

  } else if (errorType === ERRORTYPES.WARN) {
    console.warn(`[${errorType}${errorCode ? ": " + errorCode : ""}]: ${errorMessage}`);

  } else {
    console.log(`[${errorType}${errorCode ? ": " + errorCode : ""}]: ${errorMessage}`);
  }
}

export default errorHandler;
export {ERRORTYPES, errorHandler};