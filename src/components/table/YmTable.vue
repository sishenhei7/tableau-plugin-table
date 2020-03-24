<template>
  <el-table
    v-if="data"
    id="js-tableau-table"
    :data="sortedData"
    empty-text="暂无数据，请点击右上角配置数据"
    style="width: 100%"
    fit
    highlight-current-row
    @sort-change="handleSortChange"
  >
    <template v-for="(field, index) in Object.keys(data[0] || {})">
      <el-table-column
        v-if="field === sentenceField"
        :key="field"
        :prop="field"
        :label="field"
        sortable="custom"
        :min-width="columnWidth[index] || ''"
        :sort-orders="['ascending', 'descending']"
      >
        <template slot-scope="scope">
          <div v-html="highlight(scope.row[sentenceField], scope.row[keywordsField])" />
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="field"
        :prop="field"
        :label="field"
        sortable="custom"
        :min-width="columnWidth[index] || ''"
        :sort-orders="['ascending', 'descending']"
      >
        <template slot-scope="scope">
          {{ scope.row[field] === '%null%' ? 'Null' : scope.row[field] }}
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import Vue from 'vue';
import {
  Table,
  TableColumn,
} from 'element-ui';
import { getValueByPath, compare } from '../../utils/util';

Vue.use(Table);
Vue.use(TableColumn);

export default {
  name: 'YmTable',
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    sentenceField: {
      type: String,
      default: '',
    },
    keywordsField: {
      type: String,
      default: '',
    },
    columnWidth: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      sortOrder: '',
    };
  },
  computed: {
    sortedData() {
      const list = [...this.data];

      // 排序
      if (this.sortOrder && this.sortOrder.order) {
        const tOrder = this.sortOrder.order === 'ascending';
        list.sort((a, b) => {
          let tA = getValueByPath(a, this.sortOrder.prop) || '-';
          let tB = getValueByPath(b, this.sortOrder.prop) || '-';

          if (Array.isArray(tA) && Array.isArray(tB)) {
            tA = tA.join('');
            tB = tB.join('');
          }

          return tOrder ? compare(tA, tB) : compare(tB, tA);
        });
      }

      return list;
    },
  },
  methods: {
    highlight(sentence, keywords) {
      if (keywords === '%null%') {
        return sentence;
      }

      let result = sentence;
      const keywordList = keywords.split(' ');

      keywordList.forEach((item) => {
        result = result.replace(item, `<b>${item}</b>`);
      });

      return result;
    },
    handleSortChange({ column, prop, order }) {
      this.sortOrder = column ? { prop, order } : null;
    },
  },
};
</script>

<style lang='scss'>
</style>
