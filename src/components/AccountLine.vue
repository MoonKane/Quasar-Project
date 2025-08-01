<template>
<tr>
  <td class="text-left">
    <q-input outlined v-model="mark" label="Значение" @blur="saveThisAccount" @focus="issueMark = false" :label-color="issueMark ? issueColor : ''"/>
  </td>

  <td class="text-left">
    <q-select outlined v-model="recordType" :options="recordTypes" @update:model-value="saveThisAccount"/>
  </td>

  <td class="text-left" :colspan="(recordType != RecordType.ldap) ? 1 : 2">
    <q-input outlined v-model="login" label="Значение" @blur="saveThisAccount" @focus="issueLogin = false" :label-color="issueLogin ? issueColor : ''"/>
  </td>

  <td class="text-left" v-if="recordType != RecordType.ldap">
    <q-input outlined  v-model="password" label="Значение" :type="isPwd ? 'password' : 'text'" @blur="saveThisAccount" @focus="issuePassword = false" :label-color="issuePassword ? issueColor : ''">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </td>
  
  <td class="text-right">
    <q-btn :square="true" fab icon="delete" text-color="black" flat color="white" @click="props.delete(account.id)"/>
  </td>
</tr>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IAccount } from 'src/interfaces/Interfaces';

const props = defineProps({
  account: {
    type: Object,
    require: true,
    default: () => {}
  },
  RecordType: {
    type: Object,
    require: true,
    default: () => {}
  },
  setAccount: {
    type: Function,
    require: true,
    default: () => {}
  },
  delete: {
    type: Function,
    require: true,
    default: () => {}
  }
});

const account = props.account;
const RecordType = props.RecordType;
const recordTypes = [RecordType.local, RecordType.ldap];

const mark = ref(account.mark.map((el: { text: string }) => el.text).join('; '));
const recordType = ref(account.recordType);
const login = ref(account.login);
const password = ref(account.password);

const issueMark = ref(false);
const issueLogin = ref(false);
const issuePassword = ref(false);
const issueColor = ref('red');

const saveThisAccount = () => {
  saveAccount({
    id: account.id,
    mark: mark.value ? mark.value.replaceAll(' ', '').split(';').map((el: string) => ({ text: el })) : mark.value,
    recordType: recordType.value,
    login: login.value,
    password: (recordType.value == RecordType.ldap) ? null : password.value
  })
}

const saveAccount = (account: IAccount) => {
  let save = true;
  if(!account.mark) {
    save = false; markAbsent();
  }
  if(!account.login) {
    save = false; loginAbsent();
  }
  if(!account.password && account.recordType != RecordType.ldap) {
    save = false; passwordAbsent();
  }
  if (account.recordType == RecordType.ldap) {
    account.password = null;
  }
  if(save) props.setAccount(account);
}

const markAbsent = () => {
    issueMark.value = true;
    console.log('Marks didnt write');
}

const loginAbsent = () => {
    issueLogin.value = true;
    console.log('Login didnt write');
}

const passwordAbsent = () => {
    issuePassword.value = true;
    console.log('Password didnt write');
}

const isPwd = ref(true);

</script>