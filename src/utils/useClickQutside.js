import { ref, onMounted, onUnmounted } from 'vue'

const useClickOutside = elementRef => {
  const isClickOutside = ref(false)
  const handler = e => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}

export default useClickOutside
