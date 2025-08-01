<template>
  <div class="q-pa-md">
    <q-markup-table :bordered="false">
      <thead>
        <tr>
          <th class="text-left">Метки</th>
          <th class="text-left">Тип записи</th>
          <th class="text-left">Логин</th>
          <th class="text-left">Пароль</th>
          <th class="text-right"></th>
        </tr>
      </thead>
      <tbody>
        <AccountLine 
          v-for="account of accounts.accounts"
          :key="account.id"
          :account="account"
          :delete="deleteClick"
          :RecordType="RecordType"
          :setAccount="setAccount"
        />
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import AccountLine from './AccountLine.vue';
import { useAccounts } from 'src/stores/account';
import type { IAccount } from 'src/interfaces/Interfaces';

const accounts = useAccounts();
const RecordType = accounts.RecordType;

const deleteClick = (id: string | number) => {
  accounts.deleteAccount(id);
}

const setAccount = (account: IAccount) => {
  accounts.setAccount(account);
}

</script>