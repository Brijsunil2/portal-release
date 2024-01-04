import errorHandler, { ERRORTYPES } from "./errorHandler";

const getUserLocationPromise = () => {
  if (navigator.geolocation) {
    return new Promise((res, _) => {
      navigator.geolocation.getCurrentPosition(res, handleError);
    }); 

  } else {
    errorHandler(ERRORTYPES.WARN, "Geolocation is not supported by this browser.");
  }
};

const findLocation = async () => {
  var pos = await getUserLocationPromise();
  
  return {latitude: pos.coords.latitude, longitude: pos.coords.longitude};
};

const handleError = (error) => {
  let errorStr;
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorStr = 'User denied the request for Geolocation.';
      break;
    case error.POSITION_UNAVAILABLE:
      errorStr = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      errorStr = 'The request to get user location timed out.';
      break;
    default:
      errorStr = 'An unknown error occurred.';
  }

  errorHandler(ERRORTYPES.ERROR, errorStr, error.code);
};

export default findLocation;