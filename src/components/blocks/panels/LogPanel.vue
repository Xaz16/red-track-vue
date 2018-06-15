<template>
    <div class="panel" routing-animation>
        <div class="panel__head task">
            <div class="panel__task">
                <p class="task__id">
                    Task #{{item.id}}
                </p>
                <div class="task__links-wrap">
                    <span class="task__link link" v-on:click="openTask">Link</span>
                    <span class="task__link link">Log</span>
                </div>
            </div>
            <div class="timer">
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
        </div>
        <div class="panel__body" v-if="isLogBodyOpened">
            <vue-form tag="div" class="log" :state="formstate" @submit.prevent="onSubmitTimer">
                <validate tag="div" class="log__time mr15">
                    <input  v-bind:class="{ 'rt-input--invalid': formstate.key && (formstate.key.$invalid && formstate.$submitted)}"
                            required
                            v-model="model.time"
                            type="number" name="time" class="rt-input rt-input--wide">
                </validate>
                <validate tag="div" class="log__comment mr10">
                    <input  v-bind:class="{ 'rt-input--invalid': formstate.key && (formstate.key.$invalid && formstate.$submitted)}"
                            required
                            v-model="model.comment"
                            type="number" name="comment" class="rt-input rt-input--wide" placeholder="Comment">
                </validate>
                <button type="submit" class="log__btn btn">Log</button>
            </vue-form>
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
        formState: {},
        isLogBodyOpened: false,
        model: {
          comment: '',
          time: ''
        }
      };
    },
    methods: {
      openTask: function () {
        chrome.tabs.create({url: `${this.url}/issues/${this.task.id}`});
      },
      onSubmitTimer: function () {
        console.log(1);
      }
    },
    props: ['item']
  };
</script>
