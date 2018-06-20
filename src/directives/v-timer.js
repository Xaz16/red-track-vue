import Vue   from 'vue';
import Timer from '../Services/Timer';

export default Vue.directive('timer', {
  inserted: function (el, binding) {
    binding.value.timer = new Timer(binding.value.timer);
  },
  update: function (el, binding) {
    const timer = binding.value.timer;
    const tick = () => {
      if (!timer.stopped) {
        binding.value.formattedTime = timer.getClock();
        const reqId = setTimeout(tick, 500);
        if (!el.dataset.reqId) {
          el.dataset.reqId = reqId;
        }
      } else {
        clearTimeout(+el.dataset.reqId);
      }
    };
    if (!timer.stopped) {
      tick(el, binding);
    }
  }
});
