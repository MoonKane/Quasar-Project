export interface IAccount {
  readonly id: string | number
  mark: { text: string }[],
  recordType: string,
  login: string,
  password: string | null
};

export interface IAccountWithoutId extends Omit<IAccount, 'id'> {}