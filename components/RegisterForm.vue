<script setup>
const { $Swal, $axios: axios } = useNuxtApp()

const termsAgreed = ref(false)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const confirmPasswordEl = ref()
const registerFormEl = ref()

const errorMessages = reactive({
  username: null,
  password: null
})

const isPasswordMatch = () => {
  if (password.value !== confirmPassword.value) {
    errorMessages.password = 'Password tidak sama'
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
  const registerPayload = Object.fromEntries(new FormData(e.target))

  if (!isPasswordMatch()) {
    alertPopup({ title: 'Oops..', text: 'Ada kesalahan pada password, silahkan perbaiki.' })
    return
  }
  try {
    await axios.post('/users', registerPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    alertPopup({ icon: 'success', title: 'Sukses', text: 'Selamat, akun telah terdaftar, silahkan masuk.' })
    registerFormEl.value.reset()
  } catch (error) {
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

<template>
  <div>
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
          <input name="tanggalLahir" class="bio" type="date" id="tanggalLahir" placeholder="Masukan tanggal lahir" required />
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
          <label class="labelbio" for="password">Password</label>
          <input name="password" class="bio" type="password" id="password" placeholder="Masukan password" v-model="password" required />
        </div>
        <div>
          <label class="labelbio" for="confirm_password"
            >Konfirmasi Password <span class="font-normal text-red-600" v-show="errorMessages.password">({{ errorMessages.password }})</span></label
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
        <label for="terms" class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">Saya memasukan data yang valid dan menyetujui <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">persyaratan layanan</a>.</label>
      </div>
      <button type="submit">Daftar</button>
    </form>
  </div>
</template>
