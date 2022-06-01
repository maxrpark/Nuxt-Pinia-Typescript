<template>
  <div class="section-center section">
    <h2 className="title">Vue assistant</h2>
    <Alert />
    <section class="main-container">
      <h2>Task List</h2>
      <Form ref="form" />
      <div class="todo-list">
        <ul class="todo-container">
          <TodoItem
            v-for="item in store.todoList"
            :key="item.id"
            :class="{ isComplete: item.isComplete }"
            :item="item"
          />
        </ul>
      </div>

      <button
        v-if="store.todoList.length"
        class="remove-items"
        @click="removeAll"
      >
        remove all
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import TodoItem from '../components/TodoItem.vue';
import Alert from '../components/Alert.vue';
import Form from '../components/Form.vue';
import { actionType } from '../ts/store/actionType';
import { useStore } from '~~/store/useStore';
const store = useStore();

const removeAll = () => {
  store.removeAll();
  store.displayAlert();
};

const getLocalStorage = () => {
  let todoList = localStorage.getItem('PiniatodoListTs');
  if (todoList) {
    return (store.todoList = JSON.parse(
      localStorage.getItem('PiniatodoListTs') as string
    ));
  } else {
    return [];
  }
};
</script>

<style></style>
