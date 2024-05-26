import { isRejectedWithValue } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');
    console.log(action)
  }

  return next(action);
};