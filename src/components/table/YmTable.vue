<template>
  <el-table
    v-if="data"
    id="js-tableau-table"
    style="width: 100%"
    :data="data"
    border
    fit
  >
    <template v-for="field in Object.keys(data[0] || {})">
      <el-table-column
        v-if="field === sentenceField"
        :key="field"
        :prop="field"
        :label="field"
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

Vue.use(Table);
Vue.use(TableColumn);

export default {
  name: 'YmTable',
  props: {
    data: {
      type: Array,
      default: null,
    },
    sentenceField: {
      type: String,
      default: '',
    },
    keywordsField: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
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
  },
};
</script>

<style lang='scss'>
</style>
