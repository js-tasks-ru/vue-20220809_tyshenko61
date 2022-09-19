<template>
  <button @click="clickButton()">{{ countClickButton }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

   props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      countClickButton: 0,
    };
  },
  watch: {
    count: {
      immediate: true,
      handler() {
        this.countClickButton = this.count;
      },
    },
  },

  methods: {
    clickButton() {
      this.countClickButton++;
      this.$emit('update:count', this.countClickButton);
    },
  },
};
</script>
