<script setup lang="ts">
import data from '../data';
import { computed, ref } from 'vue';
import { type FilterOption, type SystemsByType, type System } from '../types';
import getCategoryName from '@/utils/getCategoryName';
import SystemNode from './SystemNode.vue';
import { NButton, NSelect, useModal } from 'naive-ui';
import { h } from 'vue';

const modal = useModal();

const selectedCategoryFilters = ref<string[]>([]);
const selectedDataUseFilters = ref<string>('');

const categoryFilterOptions = ref<FilterOption[]>([
  {
    label: 'Cookie ID',
    value: 'cookie_id',
  },
  {
    label: 'IP Address',
    value: 'ip_address',
  },
  {
    label: 'Location',
    value: 'location',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Financial',
    value: 'financial',
  },
]);

const dataUseFilterOptions = ref<FilterOption[]>([
  {
    label: 'Third Party Advertising',
    value: 'advertising.third_party',
  },
  {
    label: 'First Party Advertising',
    value: 'advertising.first_party',
  },
  {
    label: 'Improve System',
    value: 'improve.system',
  },
  {
    label: 'Provide System',
    value: 'provide.system',
  },
  {
    label: 'Provide System Operations Support',
    value: 'provide.system.operations.support',
  },
]);

const filteredData = computed(() => {
  let filteredData: System[] = [...data];

  // if we have selected filters then check to see if see if any privacy declarations
  // have data categories that overlap with any of the selected filter categories
  if (selectedCategoryFilters.value.length) {
    filteredData = filteredData.filter((system) => {
      return system.privacy_declarations.some((declaration) => {
        const categories = declaration.data_categories.map((category) => getCategoryName(category));
        return (
          categories.length &&
          categories.some((cat) => cat && selectedCategoryFilters.value.includes(cat))
        );
      });
    });
  }

  if (selectedDataUseFilters.value.length) {
    filteredData = filteredData.filter((system) => {
      return system.privacy_declarations.some((declaration) => {
        return selectedDataUseFilters.value === declaration.data_use;
      });
    });
  }

  return filteredData;
});

// returns the systems keyed by Sytem Type
const mapDataBySystemType = computed(() => {
  const systems: SystemsByType = {};

  filteredData.value.forEach((system) => {
    const systemType = system.system_type.toLowerCase() as keyof SystemsByType;

    if (!systems[systemType]) {
      systems[systemType] = [];
    }

    // add the system to the type grouping only if we have NOT added a system with the same id already
    if (!systems[systemType].some((sys) => sys.fides_key === system.fides_key)) {
      systems[systemType]?.push(system);
    }
  });
  return systems;
});

function clearFilters() {
  selectedCategoryFilters.value = [];
  selectedDataUseFilters.value = '';
}

function showModal(system: System) {
  modal.create({
    title: system.name,
    preset: 'card',
    content: () =>
      h(SystemNode, {
        system: system,
        isModal: true,
      }),
    style: {
      width: '600px',
      maxWidth: '90vw',
    },
  });
}
</script>

<template>
  <h1 class="font-basie mt-4">Example.com Data Map</h1>
  <!-- filters tool bar -->
  <div class="flex items-center h-24 w-full border border-gray-300 px-3 mb-5">
    <label id="category-label" class="mr-3">Categories</label>
    <div class="w-80 mr-5">
      <NSelect
        data-test="category-filter"
        :style="{ overflow: 'hidden' }"
        v-model:value="selectedCategoryFilters"
        multiple
        selectedCategoryFilters
        :options="categoryFilterOptions"
        aria-labelledby="category-label"
      />
    </div>
    <span class="mr-3">Data use</span>
    <div class="w-50">
      <NSelect v-model:value="selectedDataUseFilters" :options="dataUseFilterOptions" />
    </div>
    <div class="ml-auto">
      <NButton
        :disabled="!selectedCategoryFilters.length && !selectedDataUseFilters.length"
        class="ml-4"
        @click="clearFilters"
        secondary
        >Clear</NButton
      >
    </div>
  </div>
  <!-- system grid -->
  <main class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-4">
    <div v-for="[type, systems] in Object.entries(mapDataBySystemType)" :key="type">
      <h2 class="font-basie capitalize">{{ type }}</h2>
      <SystemNode
        v-for="system in systems"
        :key="system.name"
        :system="system"
        :is-modal="false"
        @click="showModal(system)"
      />
    </div>
  </main>
</template>
