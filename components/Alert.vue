<template>
  <div class="alert-container">
    <div
      v-if="store.showAlert"
      :class="store.alertMessege.type"
      class="alert-box"
    >
      <p>{{ store.alertMessege.messege }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~~/store/useStore';

const store = useStore();
</script>

<style lang="scss" scoped></style>
