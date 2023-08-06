export const useLocalDate = (date: string): string => {
  const now = new Date(date)
  const options = { hour12: false, timeZone: 'Asia/Makassar' } // Ganti sesuai zona waktu Anda
  return now.toLocaleString('id-ID', options)
}
