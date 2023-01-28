export type SuccessState<T> = {
  result: "success";
  data?: T;
};

export type ErrorState = {
  result: "fail";
  reason?: string;
  message?: string;
};

export type ResultState<T> = SuccessState<T> | ErrorState;
