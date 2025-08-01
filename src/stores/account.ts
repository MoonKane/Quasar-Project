import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import type { IAccount, IAccountWithoutId } from 'src/interfaces/Interfaces';



export const useAccounts = defineStore('accounts', () => {
  const RecordType = {
    local: 'Локальная',
    ldap: 'LDAP'
  }

  const accounts = ref([
    {
      id: 1,
      mark: [{text:'XXX'}],
      recordType: RecordType.local,
      login: 'Salmon',
      password: '3dks10dks1'
    },
    {
      id: 2,
      mark: [{text:'YYY'}],
      recordType: RecordType.ldap,
      login: 'Sergey334',
      password: null
    },
    {
      id: 3,
      mark: [{text:'XXX'}, {text:'DDDDD'}],
      recordType: RecordType.local,
      login: 'NicolaMersedes',
      password: 'bvcs21ds'
    },
    {
      id: 4,
      mark: [{text:'DDD'}, {text:'YYYYYY'}, {text:'DDDDD'}],
      recordType: RecordType.ldap,
      login: 'KnightMachine',
      password: null
    }
  ]);

  const maxId = ref(Object.keys(accounts).length);

  const accountsLocalStorage = localStorage.getItem('accounts');
  if(accountsLocalStorage) {
    accounts.value = JSON.parse(accountsLocalStorage);
    const maxIdAccount = accounts.value.findLast(el => Number(el.id) > 0);
    if(maxIdAccount) maxId.value = maxIdAccount.id;
  }

  const setAccount = (account: IAccount) => {
    accounts.value = accounts.value.map(el => {
      if(el.id == account.id) {
        el.mark = account.mark;
        el.recordType = account.recordType;
        el.login = account.login;
        el.password = account.password;
      }
      return el
    });
    setLocalStorage();
    console.log(`Data by account with id: ${account.id} changed`);
  }

  const addAccount = (account: IAccountWithoutId) => {
    accounts.value.push({
      id: maxId.value+1,
      mark: account.mark,
      recordType: account.recordType,
      login: account.login,
      password: account.password
    });
    maxId.value = maxId.value+1;
  }

  const deleteAccount = (id: string | number) => {
    accounts.value = accounts.value.filter(el => el.id !== id);
    setLocalStorage();
    console.log(`Account with id: ${id} deleted`);
  }

  const setLocalStorage = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value));
    console.log('LocalStorage changed');
  }

  return { accounts, RecordType, addAccount, setAccount, deleteAccount }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccounts, import.meta.hot));
}
