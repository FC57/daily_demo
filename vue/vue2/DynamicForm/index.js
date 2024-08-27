console.log('index.js'); // 测试 defer module 以及普通脚本执行顺序

new Vue({
  el: '#box',
  provide() {
    return {
      provideCount: () => this.count
    };
  },
  data() {
    return {
      count: 0,
      step: 1,
      isSupport: true,
      currentStepTitle: '基本信息',
      tabList: ['基本信息', '阶段x', '阶段y'],
      baseInfo: [
        { type: 'Date', itemCode: 'date', itemAlias: '日期选择', itemValue: '2022-08-19' },
        { type: 'Int', itemCode: 'period', itemAlias: '文本输入', itemValue: '12' },
        { type: 'Select', itemCode: 'select1', itemAlias: '下拉框选择1', itemValue: '' },
        { type: 'Select', itemCode: 'select2', itemAlias: '下拉框选择2', itemValue: '' }
      ],
      selectOptions: {
        select1: ['选项1', '选项2', '选项3'],
        select2: ['选项4', '选项5', '选项6']
      },
      dateOptions: [
        {
          itemCode: 'code1',
          itemAlias: '日期1',
          other: { date1: '2022-08-29' },
          alias: null,
          date: '2022-08-19'
        },
        {
          itemCode: 'code2',
          itemAlias: '日期2',
          other: { date1: '2022-08-29' },
          alias: null,
          date: '2022-08-19'
        },
        {
          itemCode: 'code3',
          itemAlias: '日期3',
          other: { date1: '2022-08-29' },
          alias: null,
          date: '2022-08-19'
        }
      ]
    };
  },
  watch: {
    isSupport(v) {
      v ? this.tabList.splice(1, 0, '阶段x') : this.tabList.splice(1, 1);
    },
    baseInfo: {
      handler(v) {
        console.log(v);
      },
      deep: true
    }
  },
  methods: {
    handleNextStep() {
      this.step++;
      this.currentStepTitle = this.tabList[this.step - 1];
    },
    changeDateOptions(val) {
      this.options = val;
    }
  },
  components: {
    dateCalc: {
      template: '#temp',
      props: {
        options: Array
      },
      data() {
        return {
          currentDate: '',
          cpOptions: [],
          inputType: {
            text: {}
          }
        };
      },
      created() {
        console.log(this.options);
        this.copyData();
        console.log(this.cpOptions);
      },
      watch: {
        cpOptions: {
          handler(val) {
            this.$emit('update:options', val);
          },
          deep: true
        }
      },
      methods: {
        copyData() {
          this.cpOptions = JSON.parse(JSON.stringify(this.options));
        },
        getInputType(itemCode) {
          for (let key in this.inputType) {
            if (this.inputType[key][itemCode]) {
              return key;
            }
          }
        }
      },
      components: {
        tempSon: {
          template: '#son',
          inject: ['provideCount'],
          computed: {
            grandpaCount() {
              console.log('computed');
              return this.provideCount();
            }
          }
        }
      }
    }
  }
});
