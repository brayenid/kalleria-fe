<script setup>
import { useAuthStore } from '~/stores/myAuthStore'
import { initModals } from 'flowbite'
import QRious from 'qrious'
import config from '~/config'
definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})

const { $axiosAuth: axios } = useNuxtApp()

const authStore = useAuthStore()
const userInfo = ref({})
const userDetail = ref({})
const qrUserIdEl = ref()
const kelasUserInfo = reactive({
  onGoing: [],
  finished: []
})

const profileImageSrc = computed(() => {
  return userDetail.value.urlFoto ? `${config.API_BASE_URL}/${userDetail.value.urlFoto}` : '/svg/blank-profile.svg'
})

onMounted(async () => {
  initModals()
  userInfo.value = await authStore.getUserInfo

  const responseUserDetail = (await axios.get('/users/detail'))?.data?.data

  userDetail.value = responseUserDetail
  const responseKelasUser = (await axios.get('/kelasuser/user'))?.data?.data
  responseKelasUser?.map((kelasUser) => {
    if (kelasUser?.presensi < kelasUser?.maksimalPertemuan) {
      kelasUserInfo.onGoing.push(kelasUser)
    } else {
      kelasUserInfo.finished.push(kelasUser)
    }
  })
  new QRious({
    element: qrUserIdEl.value,
    value: responseUserDetail.id
  })
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
</style>

<template>
  <div>
    <Teleport to="body">
      <div id="qrModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-sm max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-4 flex justify-center items-center">
              <canvas ref="qrUserIdEl" class="w-40"></canvas>
            </div>
            <div class="flex items-center rounded-b-lg overflow-hidden dark:border-gray-600">
              <button
                data-modal-hide="qrModal"
                type="button"
                class="text-white bg-red-600 w-full hover:bg-red-700 focus:outline-none focus:ring-0 border-0 text-sm font-medium py-3 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <div class="bg-white w-full p-4 sm:p-8 shadow-md rounded-md">
      <div class="flex justify-between items-center">
        <NuxtLink to="#" class="py-1 px-3 rounded text-blue-500 border border-blue-500 hover:bg-blue-100">Edit</NuxtLink>
        <button data-modal-target="qrModal" data-modal-toggle="qrModal" class="py-1 px-3 rounded text-orange-500 border border-orange-500 hover:bg-orange-100">
          <div class="flex justify-center items-center gap-2"><IconsQr class="text-orange-500" /> <span class="hidden sm:block">User ID</span></div>
        </button>
      </div>
      <div class="flex flex-col text-center items-center justify-center gap-8 py-4">
        <div class="max-w-[150px] overflow-hidden rounded-full">
          <img :src="profileImageSrc" alt="profile" :title="`${userDetail?.nama} Profile`" />
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
              <p>{{ userDetail?.nomorTelepon }}</p>
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
          <div class="kelas-container">
            <div>
              <div class="kelas-info">
                <IconsBook class="text-green-400 !w-8 !h-8" />
                <span>{{ kelasUserInfo?.onGoing?.length }}</span>
              </div>
              <p>Kelas diikuti</p>
            </div>
            <div>
              <div class="kelas-info">
                <IconsTrophy class="text-yellow-400 !w-8 !h-8" />
                <span>{{ kelasUserInfo?.finished?.length }}</span>
              </div>
              <p>Kelas telah dilewati</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
