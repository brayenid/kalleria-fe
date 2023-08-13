<script setup>
const props = defineProps({
  endpoint: String,
  message: String,
  redirect: String,
  after: Function
})
const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const deleteItem = async () => {
  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: 'Yakin menghapus item?',
    text: props.message || 'Yang telah dihapus tidak dapat dikembalikan',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal'
  })
  if (isConfirmed) {
    try {
      await axios.delete(`${useRuntimeConfig().public.beEndpoint}/${props.endpoint}`)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Item telah dihapus',
        showConfirmButton: true
      })
      if (props.after) await props.after()
      props.redirect && (await navigateTo(props.redirect))
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Gagal menghapus item',
        showConfirmButton: true
      })
    }
  }
}
</script>
<template>
  <div>
    <button
      @click="deleteItem"
      type="button"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg w-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    >
      Hapus
    </button>
  </div>
</template>
