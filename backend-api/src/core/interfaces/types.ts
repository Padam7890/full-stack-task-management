

//types 

export enum roleEnums {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }
  
export interface token {
  token:string
}

export type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
};