<template>
    <div class="panel" routing-animation>
        <div class="panel__head task">
            <div class="panel__task">
                <p class="task__id">
                    Task #{{item.id}}
                </p>
                <div class="task__links-wrap">
                    <span class="task__link link" v-on:click="openTask">Link</span>
                    <span v-if="isLog">Log</span>
                    <span class="task__link link" v-else>Create timer</span>
                </div>
            </div>
            <div v-if="isLog" class="timer">
                <div class="large-timer">
                    10:10
                </div>
            </div>
            <div class="task__detail task__detail--wide">
                <h2 class="task__detail-heading task-heading">
                    {{item.subject}}
                </h2>
                <div class="task__detail-info muted">
                    <span class="task__detail-item">
                        Timers: 2
                    </span>
                    <span class="task__detail-item">
                        Assignee: {{item.assigned_to.name}}
                    </span>
                    <span class="task__detail-item">
                        Status: {{item.status.name}}
                    </span>
                    <span class="task__detail-item">
                        Done: {{item.done_ratio}}%
                    </span>
                </div>
            </div>
            <div class="task__controls-wrap">
                <div class="task__control">
                    <img src="pause.svg" alt="">
                </div>
                <div class="task__control">
                    <img src="check.svg" alt="">
                </div>
                <div class="task__control">
                    <img src="delete.svg" alt="">
                </div>
            </div>
            <div class="task__timer large-timer">
                01:00:00:00
            </div>
        </div>
        <div class="panel__body" v-if="isBodyOpened">
            <div class="timer">
                <vue-form tag="div" :state="formState" @submit.prevent="onSubmit" class="timer__controls">
                    <div class="timer__increase-group">
                        <button type="button" class="btn btn--dark">-1h</button>
                        <button type="button" class="btn btn--dark">-30m</button>
                        <button type="button" class="btn btn--dark">-15m</button>
                        <button type="button" class="btn btn--dark">-5m</button>
                        <button type="button" class="btn btn--dark">-1m</button>
                    </div>
                    <validate tag="div">
                        <input  v-bind:class="{ 'rt-input--invalid': formstate.time_count && (formstate.time_count.$invalid && formstate.$submitted)}"
                                v-model="model.time_count"
                                required
                                type="number" class="timer__input rt-input" name="timer_count">
                    </validate>
                    <div class="timer__decrease-group">
                        <button type="button" class="btn btn--dark">+1m</button>
                        <button type="button" class="btn btn--dark">+5m</button>
                        <button type="button" class="btn btn--dark">+15m</button>
                        <button type="button" class="btn btn--dark">+30m</button>
                        <button type="button" class="btn btn--dark">+1h</button>
                    </div>
                </vue-form>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    async beforeMount () {
      const {url} = await window.storage.getInstance.get();
      this.$data.url = url;
    },
    data () {
      return {
        url: '',
        isBodyOpened: false,
        formState: {},
        model: {
          time_count: ''
        }
      };
    },
    methods: {
      onSubmit: function () {

      },
      openTask: function () {
        chrome.tabs.create({url: `${this.url}/issues/${this.task.id}`});
      }
    },
    props: ['item']
  };
</script>
