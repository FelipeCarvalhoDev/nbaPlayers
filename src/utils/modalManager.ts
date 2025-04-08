import { ref } from 'vue';

export const modalState = ref({
  isVisible: false,
  title: '',
  message: ''
});

export function showModal(title: string, message: string) {
  modalState.value = { isVisible: true, title, message };
}

export function hideModal() {
  modalState.value.isVisible = false;
}