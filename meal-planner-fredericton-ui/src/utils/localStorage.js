const USER_DETAILS_KEY = 'userDetails';

export const setUserDetails = userResponse => {
  localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(userResponse));
};

export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem(USER_DETAILS_KEY));
};

export const removeUserDetails = () => {
  localStorage.removeItem(USER_DETAILS_KEY);
};
