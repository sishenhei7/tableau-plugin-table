<template>
  <el-table />
</template>

<script>
import Vue from 'vue';
import {
  Table,
} from 'element-ui';

Vue.use(Table);

export default {
  name: 'YmTable',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='scss'>
</style>
