// Importing necessary types from @reduxjs/toolkit
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { errorToast } from '@/utils/toastNotification';


// Type guard for FetchBaseQueryError
const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError =>
    error && 'status' in error && 'data' in error;
  
  // Type guard for SerializedError
  const isSerializedError = (error: any): error is SerializedError =>
    error && 'message' in error;
  
  export const handleError = (error: FetchBaseQueryError | SerializedError | unknown) => {
    let errorMessage: string = "Something went wrong";
  
    if (isFetchBaseQueryError(error)) {
      // Handle FetchBaseQueryError
      const errorData = error.data as ErrorResponseData | undefined;
      if (errorData) {
        if (errorData) {
          errorMessage = errorData.message || "An error occurred";
        } 
      }
    } else if (isSerializedError(error)) {
      // Handle SerializedError
      errorMessage = error.message || "An error occurred";
    } else if (error instanceof Error) {
      // Handle generic JavaScript Error
      errorMessage = error.message || "An error occurred";
    }
    else{
      errorMessage = "Something went wrong";
    }

  
    errorToast(errorMessage);
    console.log(error);
  };
  

