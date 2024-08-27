new Vue({
  el: '#wrap',
  data() {
    return {
      paymentScenarioList: [
        {
          name: '循环期',
          scenarioId: '1'
        },
        {
          name: '摊还期',
          scenarioId: '2'
        },
        {
          name: '加速清偿事件',
          scenarioId: '3'
        },
        {
          name: '特殊1',
          scenarioId: '4'
        },
        {
          name: '特殊2',
          scenarioId: '5'
        }
      ],
      c_scenario: {
        name: '循环期',
        scenarioId: '1'
      },
      loadingShow: false,
      switchTimer: null
    };
  },
  methods: {
    switchScenario(scenario) {
      if (this.switchTimer) {
        clearTimeout(this.switchTimer);
      }
      this.loadingShow = true;
      this.c_scenario = scenario;
      this.switchTimer = setTimeout(() => {
        this.loadingShow = false;
        this.switchTimer = null;
      }, 1500);
    }
  }
});
