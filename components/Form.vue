<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <input
      :value="store.ItemValue"
      @input="updateMessage"
      type="text"
      class="input-control"
      placeholder="Type something..."
      maxlength="25"
    />
  </form>
</template>

<script setup lang="ts">
import { useStore } from '~~/store/useStore';
import { actionType } from '@/ts/store/actionType';

let store = useStore();

const handleSubmit = () => {
  store.handleSubmit();
  store.displayAlert();
};

onMounted(() => store.getLocalStorage());
const updateMessage = (e: any) => {
  store.ItemValue = e.target.value;
};
</script>

<style lang="scss" scoped></style>
