<template>
  <ui-icon class="toast__icon" :icon="toast.icon" />
  <span> {{ toast.message }} </span>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: {
    toast: {
      type: Object,
      required: true,
    },
  },
 };
</script>

<style scoped>
.toast__icon {
  margin-right: 12px;
}
</style>
