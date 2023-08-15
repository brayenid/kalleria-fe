<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '~/assets/css/datepicker.css'

const { $Swal, $axios: axios } = useNuxtApp()

const termsAgreed = ref(false)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const confirmPasswordEl = ref()
const registerFormEl = ref()
const tanggalLahir = ref('')
const isFetching = ref(false)

const errorMessages = reactive({
  username: null,
  password: null,
  confPassword: null
})

const isPasswordMatch = () => {
  if (password.value !== confirmPassword.value) {
    errorMessages.confPassword = 'Password tidak sama'
    return false
  }
  errorMessages.confPassword = ''
  return true
}

const isPasswordValid = () => {
  if (password.value.length < 8) {
    errorMessages.password = 'Minimal 8 karakter, terdapat 1 angka, dan 1 huruf kapital.'
    return false
  }

  if (!/[A-Z]/.test(password.value) || !/[0-9]/.test(password.value)) {
    errorMessages.password = 'Minimal 8 karakter, terdapat 1 angka, dan 1 huruf kapital.'
    return false
  }
  errorMessages.password = ''
  return true
}

const alertPopup = ({ icon, title, text }) => {
  $Swal.fire({
    icon: icon || 'error',
    title,
    text
  })
}

const submitForm = async (e) => {
  const formData = new FormData(e.target)
  formData.append('tanggalLahir', tanggalLahir.value)
  const registerPayload = Object.fromEntries(formData)

  if (!isPasswordMatch() || !isPasswordValid()) {
    alertPopup({ title: 'Oops..', text: 'Ada kesalahan pada password, silahkan perbaiki.' })
    return
  }
  try {
    isFetching.value = true
    await axios.post('/users', registerPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    isFetching.value = false

    alertPopup({ icon: 'success', title: 'Sukses', text: 'Selamat, akun telah terdaftar, silahkan masuk.' })
    registerFormEl.value.reset()
  } catch (error) {
    isFetching.value = false
    try {
      const err = error.response.data.message
      err.map((e) => {
        if (e.path === 'username') {
          errorMessages.username = e.msg
        }
      })
      alertPopup({ title: 'Oops..', text: 'Ada kesalahan pada formulir, silahkan perbaiki.' })
    } catch (error) {
      alertPopup({ title: 'Oops..', text: 'Ada kesalahan pada formulir, silahkan perbaiki.' })
    }
  }
}
</script>

<style lang="postcss" scoped>
form.register {
  @apply mt-6;
}
form.register .bio {
  @apply bg-white border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
form.register select {
  @apply bg-white border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
form.register .labelbio {
  @apply block mb-2 text-xs font-medium text-gray-900 dark:text-white;
}
form.register button {
  @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}
</style>

<style lang="postcss">
.dp-custom {
  @apply bg-white border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
</style>

<template>
  <div>
    <Loading v-if="isFetching" />
    <h1 class="text-center text-lg font-semibold mb-10">Daftar Akun</h1>
    <form @submit.prevent="submitForm" class="register" ref="registerFormEl">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label class="labelbio" for="username"
            >Username <span class="font-normal text-red-600" v-show="errorMessages.username">({{ errorMessages.username }})</span></label
          >
          <input name="username" class="bio" type="text" id="username" placeholder="Masukan username anda" v-model="username" required @input="errorMessages.username = ''" />
        </div>
        <div>
          <label class="labelbio" for="nama">Nama</label>
          <input name="nama" class="bio" type="text" id="nama" placeholder="Masukan nama lengkap" required />
        </div>
        <div>
          <label class="labelbio" for="noIdentitas">No Identitas</label>
          <input name="noIdentitas" class="bio" type="text" id="noIdentitas" placeholder="Masukan NIK/Kartu Pelajar/Kartu Mahasiswa" required />
        </div>
        <div>
          <label class="labelbio" for="jenisKelamin">Jenis Kelamin</label>
          <select name="jenisKelamin" id="jenisKelamin">
            <option selected>Pilih jenis kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label class="labelbio" for="tempatLahir">Tempat Lahir</label>
          <input name="tempatLahir" class="bio" type="text" id="tempatLahir" placeholder="Masukan tempat lahir" required />
        </div>
        <div>
          <label class="labelbio" for="tanggalLahir">Tanggal Lahir</label>
          <VueDatePicker
            id="tanggalLahir"
            input-class-name="dp-custom"
            v-model="tanggalLahir"
            placeholder="Masukan tanggal lahir"
            :enable-time-picker="false"
            :auto-apply="true"
            format="dd/MM/yyyy"
            preview-format="dd/MM/yyyy"
            text-input
            model-type="dd/MM/yyyy"
            :max-date="new Date()"
            :text-input-options="{ format: 'dd/MM/yyyy', enterSubmit: true }"
            :hide-input-icon="true"
          ></VueDatePicker>
        </div>
        <div>
          <label class="labelbio" for="alamat">Alamat</label>
          <input name="alamat" class="bio" type="text" id="alamat" placeholder="Masukan alamat" required />
        </div>
        <div>
          <label class="labelbio" for="email">Email</label>
          <input name="email" class="bio" type="email" id="email" placeholder="Masukan email" required />
        </div>
        <div>
          <label class="labelbio" for="noTelepon">No Telepon</label>
          <input name="noTelepon" class="bio" type="tel" id="noTelepon" placeholder="Masukan no telepon" required />
        </div>
        <div>
          <label class="labelbio" for="asalSekolah">Asal Sekolah</label>
          <input name="asalSekolah" class="bio" type="text" id="asalSekolah" placeholder="Masukan asal sekolah" required />
        </div>
        <div>
          <label class="labelbio" for="password"
            >Password <span class="font-normal text-red-600" v-show="errorMessages.password">({{ errorMessages.password }})</span></label
          >
          <input @input="isPasswordValid" name="password" class="bio" type="password" id="password" placeholder="Masukan password" v-model="password" required />
        </div>
        <div>
          <label class="labelbio" for="confirm_password"
            >Konfirmasi Password <span class="font-normal text-red-600" v-show="errorMessages.confPassword">({{ errorMessages.confPassword }})</span></label
          >
          <input name="" class="bio" type="password" id="confirm_password" placeholder="Masukan password sekali lagi" v-model="confirmPassword" ref="confirmPasswordEl" @input="isPasswordMatch" required />
        </div>
      </div>
      <div class="flex items-center mb-6">
        <div class="flex items-center h-5">
          <input
            name=""
            id="terms"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            type="checkbox"
            v-model="termsAgreed"
            required
          />
        </div>
        <label for="terms" class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >Saya memasukan data yang valid dan menyetujui <a href="/tos" target="_blank" class="text-blue-600 hover:underline dark:text-blue-500">persyaratan layanan</a>.</label
        >
      </div>
      <button type="submit">Daftar</button>
    </form>
  </div>
</template>
