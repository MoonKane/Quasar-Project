<template>
  <div class="accountDetails">
    <div class="accountHeader">
      <span class="accountTitle">Учётные записи</span>
      <q-btn :square="true" fab icon="add" outline @click="addClick"/>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-banner inline-actions rounded class="bg-grey-4">
        <div>
          <q-badge color="black" rounded outline class="q-mr-sm" label="?"/>
          Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </div>
      </q-banner>
    </div>
    <AccountList />
  </div>
</template>

<script setup lang="ts">
import { useAccounts } from 'src/stores/account';
import AccountList from './AccountList.vue';

const accounts = useAccounts();
const RecordType = accounts.RecordType;

const addClick = () => {
  accounts.addAccount({
    mark: [],
    recordType: RecordType.local,
    login: '',
    password: ''
  });
};

</script>

<style scoped>

.accountDetails {
  padding-top: 50px;
}

.accountHeader {
  display: flex;
  justify-content: start;
  align-items: center;
}

.accountTitle {
  font-size: 28px;
  padding: 20px;
}

</style>