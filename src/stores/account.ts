import { defineStore } from 'pinia';

enum RecordType {
  local = 'Локальная',
  ldap = 'LDAP'
}

interface Account {
  readonly id: string | number,
  mark: string[],
  recordType: RecordType,
  login: string,
  password: string | null
}

export const useAccounts = defineStore('accounts', () => {
  const accounts: Account = {
    id: 1,
    mark: [],
    recordType: RecordType.local,
    login: '',
    password: null
  }
  
  return { accounts }
});