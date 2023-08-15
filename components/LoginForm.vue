<script setup>
import { useAuthStore } from '~/stores/myAuthStore'
const { $axios: axios, $Swal: Swal } = useNuxtApp()

const authStore = useAuthStore()
const isSubmitDisable = ref(false)
const loginAs = ref('user')
const isFetching = ref(false)

const submitForm = async (e) => {
  const loginPayload = Object.fromEntries(new FormData(e.target))
  isFetching.value = true
  try {
    const response = (
      await axios.post(`/auth/${loginAs.value}`, loginPayload, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
    )?.data?.data?.accessToken

    authStore.$patch({
      accessToken: response
    })

    isSubmitDisable.value = true
    Swal.fire({
      icon: 'success',
      title: 'Berhasil masuk',
      showConfirmButton: false,
      timer: 1000
    })
    isFetching.value = false
    return location.replace('/')
  } catch (error) {
    isFetching.value = false
    const err = error.response.data.message

    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: err
    })
  }
}
</script>

<style scoped lang="postcss">
form.login label {
  @apply block mb-3 text-sm font-medium text-gray-800 dark:text-white;
}
</style>

<template>
  <div class="w-full max-w-md p-8 bg-white rounded-md shadow-md">
    <Loading v-if="isFetching" />
    <h1 class="text-center text-xl font-bold mb-10 text-gray-800">Masuk Akun</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-6">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          class="bg-white text-gray-800 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Masukan username anda"
          required
        />
      </div>
      <div class="mb-6">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="********"
          required
        />
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        :disabled="isSubmitDisable"
      >
        Masuk
      </button>
      <div class="flex items-center justify-end mt-6 gap-2">
        <label for="role" class="block text-xs font-medium text-gray-900 dark:text-white">Masuk sebagai</label>
        <select
          id="role"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="loginAs"
        >
          <option value="user" selected>User</option>
          <option value="admin">Admin</option>
          <option value="sudo">Sudo</option>
        </select>
      </div>
    </form>
  </div>
</template>
