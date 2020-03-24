<template>
  <el-tabs
    v-model="tabName"
    type="border-card"
  >
    <el-tab-pane
      label="基本设置"
      name="基本设置"
    >
      <el-form
        ref="basicForm"
        :model="basicConfig"
        :rules="basicFormRules"
        label-position="left"
        label-width="130px"
      >
        <el-form-item label="关联的表名">
          <el-select
            v-model="basicConfig.sheetName"
            placeholder="请选择要关联的表名"
            @change="handleSheetNameChange"
          >
            <el-option
              v-for="item in sheetNameList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词字段名">
          <el-select
            v-model="basicConfig.keywordsField"
            placeholder="请选择关键词字段名"
          >
            <el-option
              v-for="item in fieldNameList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="高亮段落字段名">
          <el-select
            v-model="basicConfig.sentenceField"
            placeholder="请选择高亮段落字段名"
          >
            <el-option
              v-for="item in fieldNameList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSave"
          >
            保存
          </el-button>
          <el-button @click="handleClose">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane
      label="其他设置"
      name="其他设置"
    >
      <el-form
        ref="otherForm"
        :model="otherConfig"
        :rules="otherFormRules"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="表格总宽度">
          <el-input
            v-model="tableWidth"
            placeholder="请输入总宽度"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="表格字段顺序">
          <el-select
            v-model="otherConfig.orderedFields"
            multiple
            placeholder="请选择"
            style="width: 300px"
          >
            <el-option
              v-for="item in fieldNameList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="每列宽度比例">
          <el-input
            v-model="columnWidth"
            placeholder="请输入总宽度"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSave"
          >
            保存
          </el-button>
          <el-button @click="handleClose">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Vue from 'vue';
import {
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
} from 'element-ui';

Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);

/* global tableau */
export default {
  name: 'YmDialog',
  props: {
    sheetNameList: {
      type: Array,
      default: () => ([]),
    },
    fieldNameList: {
      type: Array,
      default: () => ([]),
    },
    freshFn: {
      type: Function,
      default: () => (1),
    },
  },
  data() {
    return {
      tabName: '基本设置',
      basicConfig: {
        sheetName: '',
        keywordsField: '',
        sentenceField: '',
      },
      otherConfig: {
        tableWidth: 2000,
        orderedFields: [],
        columnWidth: [],
      },
      basicFormRules: {
        sheetName: [
          { required: true, trigger: ['blur', 'changed'] },
        ],
        keywordsField: [
          { required: true, trigger: ['blur', 'changed'] },
        ],
        sentenceField: [
          { required: true, trigger: ['blur', 'changed'] },
        ],
      },
      otherFormRules: {
        tableWidth: [
          { required: true, trigger: ['blur', 'changed'] },
        ],
        orderedFields: [
          { required: true, trigger: ['blur', 'changed'] },
        ],
        columnWidth: [
          { required: true, trigger: ['blur', 'changed'] },
        ],
      },
    };
  },
  watch: {
    fieldNameList(newVal) {
      const orderedFields = tableau.extensions.settings.get('orderedFields');
      const columnWidth = tableau.extensions.settings.get('columnWidth');

      this.otherConfig.orderedFields = orderedFields ? orderedFields.split('|') : [...newVal];
      this.otherConfig.columnWidth = columnWidth ? columnWidth.split('|') : newVal.map(() => 1000);
    },
  },
  methods: {
    init() {
      const sheetName = tableau.extensions.settings.get('sheetName');
      const sentenceField = tableau.extensions.settings.get('sentenceField');
      const keywordsField = tableau.extensions.settings.get('keywordsField');
      const tableWidth = tableau.extensions.settings.get('tableWidth');
      const orderedFields = tableau.extensions.settings.get('orderedFields');
      const columnWidth = tableau.extensions.settings.get('columnWidth');

      this.basicConfig.sheetName = sheetName || '';
      this.basicConfig.sentenceField = sentenceField || '';
      this.basicConfig.keywordsField = keywordsField || '';
      this.otherConfig.tableWidth = tableWidth || 2000;
      this.otherConfig.orderedFields = orderedFields ? orderedFields.split('|') : [];
      this.otherConfig.columnWidth = columnWidth ? columnWidth.split('|') : [];
    },
    resetFields() {
      this.basicConfig.sentenceField = '';
      this.basicConfig.keywordsField = '';
      this.otherConfig.orderedFields = [];
    },
    handleSheetNameChange() {
      if (this.freshFn && this.basicConfig.sheetName) {
        tableau.extensions.settings.set('sheetName', this.basicConfig.sheetName);
        tableau.extensions.settings.saveAsync().then((currentSettings) => {
          this.freshFn();
          this.resetFields();
          console.log('currentSettings', currentSettings);
        });
      }
    },
    handleSave() {
      if (this.tabName === '基本设置') {
        this.$refs.basicForm.validate((valid) => {
          if (valid) {
            this.saveData();
          }
        });
      } else {
        this.$refs.basicForm.validate((valid) => {
          if (valid) {
            this.$refs.otherForm.validate((validOtherForm) => {
              if (validOtherForm) {
                this.saveData();
              }
            });
          } else {
            this.tabName = '基本设置';
          }
        });
      }
    },
    saveData() {
      tableau.extensions.settings.set('sheetName', this.basicConfig.sheetName);
      tableau.extensions.settings.set('keywordsField', this.basicConfig.keywordsField);
      tableau.extensions.settings.set('sentenceField', this.basicConfig.sentenceField);
      tableau.extensions.settings.set('orderedFields', this.otherConfig.orderedFields.join('|'));

      tableau.extensions.settings.saveAsync().then((currentSettings) => {
        tableau.extensions.ui.closeDialog('10');
        console.log('currentSettings', currentSettings);
      });
    },
    handleClose() {
      tableau.extensions.ui.closeDialog('10');
    },
  },
};
</script>

<style lang='scss'>
</style>
