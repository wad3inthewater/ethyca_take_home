<script setup lang="ts">
import { type System } from '../types';
import getCategoryName from '@/utils/getCategoryName';
import { computed } from 'vue';

interface Props {
  system: System;
  isModal: boolean;
}
const props = defineProps<Props>();

// get the categories for the chips to display
const categories = computed(() => {
  const privacyDeclarations = [...props.system.privacy_declarations];

  const uniqueCategories = new Set();

  privacyDeclarations.forEach((declaration) => {
    if ('data_categories' in declaration) {
      declaration.data_categories.forEach((category) => {
        const categoryName = getCategoryName(category);

        uniqueCategories.add(categoryName?.toUpperCase());
      });
    }
  });

  return uniqueCategories;
});

const dependencies = computed(() => {
  return props.system.system_dependencies.join(', ');
});
</script>

<template>
  <div
    data-test="system-node"
    class="flex flex-col block w-full h-60"
    :class="{
      'duration-100 ease-in hover:scale-105 bg-gray-100  p-3 mb-4 cursor-pointer': !props.isModal,
    }"
  >
    <h3 v-if="!isModal">{{ props.system.name }}</h3>
    <h4 v-if="isModal" class="mb-2">
      <span class="font-bold">Sytem type:</span> {{ system.system_type }}
    </h4>
    <p v-if="isModal"><span class="font-bold mr-1">description:</span>{{ system.description }}</p>
    <template v-if="isModal">
      <span class="font-bold mt-2">System dependencies:</span>
      <p v-if="!!dependencies" class="flex flex-row flex-wrap text-sm">
        {{ dependencies }}
      </p>
      <p v-else>none</p>
    </template>
    <div class="flex flex-wrap mt-auto">
      <div
        class="p-2 bg-gray-500 text-white mr-2 mb-2 rounded-xl text-xs font-semibold"
        v-for="category in categories"
        :key="`${category}`"
      >
        {{ category }}
      </div>
    </div>
  </div>
</template>
