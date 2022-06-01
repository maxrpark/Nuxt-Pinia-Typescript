<template>
  <div class="section">
    <h2 class="title">{{ store.title }}</h2>
    <h3 class="title">Same App with different frameworks or languages</h3>
    <div class="container">
      <div v-for="project in store.projects" class="card" :key="project.id">
        <ProjectsCard :project="project" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '~~/store/useStore';

let store = useStore();

onMounted(() => {
  if (store.projects.length === 0) {
    store.getProjects();
  }
});
</script>
