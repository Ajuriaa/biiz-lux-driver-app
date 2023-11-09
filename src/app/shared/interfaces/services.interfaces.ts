import { IUser } from "src/app/interfaces";

export interface IWeatherInfo {
  icon: string;
}

export interface IWeatherResponse {
  weather: IWeatherInfo[];
  main: {
    temp: number;
  }
}

export interface IHomeResponse {
  weather: IWeatherResponse;
}

export interface IProfileHeaderResponse {
  currentUser: IUser;
}
