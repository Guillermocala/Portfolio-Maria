import { ref } from 'vue'

export function useLightbox() {
  const visible = ref(false)
  const index = ref(0)
  const images = ref<string[]>([])

  const open = (imgs: string[], startIndex = 0) => {
    images.value = imgs
    index.value = startIndex
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  return { visible, index, images, open, close }
}
