<script setup>
import QRious from 'qrious'
import { useAuthStore } from '~/stores/myAuthStore'

const qrUserIdEl = ref()
const authStore = useAuthStore()
onMounted(async () => {
  const userId = (await authStore.getUserInfo).id
  new QRious({
    element: qrUserIdEl.value,
    value: userId
  })
})
</script>
<template>
  <div id="qrModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative max-w-min max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="p-4 flex justify-center items-center">
          <canvas ref="qrUserIdEl" class="w-40"></canvas>
        </div>
        <div class="flex items-center rounded-b-lg overflow-hidden dark:border-gray-600">
          <button
            data-modal-hide="qrModal"
            type="button"
            class="text-white bg-red-600 w-full hover:bg-red-700 focus:outline-none focus:ring-0 border-0 text-base font-medium py-3 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
