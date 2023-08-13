<script setup>
import { initModals } from 'flowbite'
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const { $axiosAuth: axios } = useNuxtApp()
const userDetail = ref({})
const route = useRoute()

const profileImageSrc = computed(() => {
  return userDetail.value.urlFoto ? `${useRuntimeConfig().public.beEndpoint}/${userDetail.value.urlFoto}` : '/svg/blank-profile.svg'
})

onMounted(async () => {
  initModals()

  const responseUserDetail = (await axios.get(`/users/detail/${route.params.id}`))?.data?.data

  userDetail.value = responseUserDetail
})
</script>

<style scoped lang="postcss">
.detail {
  @apply mb-6 border-b border-gray-100 pb-2;
}
.detail h3 {
  @apply font-semibold md:text-lg;
}
.detail p {
  @apply md:text-lg font-light;
}
.kelas-info {
  @apply flex text-4xl items-center gap-4 justify-center;
}
.kelas-container {
  @apply p-8 flex-[1] flex flex-col gap-7 border-l border-slate-100 text-center;
}
.kelas-container p {
  @apply text-lg font-light;
}
.container {
  background: rgb(255, 255, 255);
  background: -moz-linear-gradient(360deg, rgba(255, 255, 255, 1) 83%, rgba(246, 254, 255, 1) 100%);
  background: -webkit-linear-gradient(360deg, rgba(255, 255, 255, 1) 83%, rgba(246, 254, 255, 1) 100%);
  background: linear-gradient(360deg, rgba(255, 255, 255, 1) 83%, rgba(246, 254, 255, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#f6feff",GradientType=1);
}
</style>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Detail Siswa" :start-index="2" :slice-link="2" />
    <div class="container w-full border border-gray-200 p-4 sm:p-8 shadow-md rounded-md">
      <div class="flex flex-col text-center items-center justify-center gap-8 py-4">
        <div class="w-40 h-40 overflow-hidden rounded-full flex justify-center items-center border-4 border-transparent ring-4 ring-blue-400">
          <img :src="profileImageSrc" class="object-cover h-full" alt="profile" :title="`${userDetail?.nama} Profile`" />
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-1">{{ userDetail?.nama }}</h2>
          <p class="font-light">{{ userDetail?.email }}</p>
        </div>
      </div>
      <div class="border border-slate-100 rounded mt-4">
        <div class="flex justify-between items-center p-4 px-8 border-b border-slate-100">
          <h2 class="md:text-lg font-semibold md:font-bold">Informasi Detail</h2>
          <IconsUserDetail class="w-6 h-6" />
        </div>
        <div class="flex flex-col md:flex-row md:justify-between">
          <div class="p-8 flex-[2]">
            <div class="detail">
              <div>
                <h3>ID</h3>
                <p>{{ userDetail?.id }}</p>
              </div>
            </div>
            <div class="detail">
              <h3>Username</h3>
              <p>{{ userDetail?.username }}</p>
            </div>
            <div class="detail">
              <h3>Alamat</h3>
              <p>{{ userDetail?.alamat }}</p>
            </div>
            <div class="detail">
              <h3>Jenis Kelamin</h3>
              <p>{{ userDetail?.jenisKelamin }}</p>
            </div>
            <div class="detail">
              <h3>Tempat Lahir</h3>
              <p>{{ userDetail?.tempatLahir }}</p>
            </div>
            <div class="detail">
              <h3>Tanggal Lahir</h3>
              <p>{{ userDetail?.tanggalLahir }}</p>
            </div>
            <div class="detail">
              <h3>Nomor Telepon</h3>
              <p>{{ userDetail?.noTelepon }}</p>
            </div>
            <div class="detail">
              <h3>Asal Sekolah</h3>
              <p>{{ userDetail?.asalSekolah }}</p>
            </div>
            <div class="detail">
              <h3>Nomor Identitas</h3>
              <p>{{ userDetail?.noIdentitas }}</p>
            </div>
            <div class="detail">
              <h3>Bergabung Pada</h3>
              <p>{{ new Date(userDetail?.createdAt).getFullYear() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
