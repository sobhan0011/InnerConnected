<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Component } from 'vue';

defineProps<{
  modelValue: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  iconLeft?: Component;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div
      class="flex items-center border border-gray-500 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
    >
      <component v-if="iconLeft" :is="iconLeft" class="w-5 h-5 text-gray-400 mr-2" />
      <input
        class="w-full bg-transparent outline-none text-sm"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>
