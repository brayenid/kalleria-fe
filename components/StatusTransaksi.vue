<script setup>
const props = defineProps({
  changeFunc: Function
})
</script>
<template>
  <form @change="props.changeFunc" class="flex-[1] h-full bg-red-400">
    <select
      class="block bg-white w-full p-3 border-l border-gray-50 text-sm text-gray-900 border-0 focus:ring-transparent focus:bg-gray-50 focus:border-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    >
      <option value="" selected>Semua</option>
      <option value="pending">Pending</option>
      <option value="dibayar">Dibayar</option>
      <option value="diterima">Diterima</option>
      <option value="ditolak">Ditolak</option>
    </select>
  </form>
</template>
