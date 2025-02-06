export type PinCode = string;

export interface IUserAccount {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  email_address: string;
  account_balance: string;
  account_status: string;
  date_opened: string;
  card_number: string;
  card_type: string;
  card_issuer: string;
  expiration_date: string;
  card_status: string;
  last_login: string;
}

export interface IUserAccountResponse {
  data: IUserAccount;
}

interface IAuth {
  id: number;
  message: string;
  token: string;
}

export interface IAuthResponse {
  data: IAuth[];
}
