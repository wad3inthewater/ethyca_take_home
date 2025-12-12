<script setup lang="ts">
import DataMap from './components/DataMap.vue';
import { NModalProvider } from 'naive-ui';
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <n-modal-provider>
      <DataMap />
    </n-modal-provider>
  </div>
</template>
