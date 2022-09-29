<template>
  <div class="pagination-container">
    <slot v-for="item in pageItems" :item="item" :key="item.id" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    pageItems() {
      const current = (this.page - 1) * this.perPage;
      return this.items.slice(current, current + this.perPage);
    },
  },
};
</script>

<style></style>
