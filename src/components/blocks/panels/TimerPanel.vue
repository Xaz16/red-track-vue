<template>
    <div class="panel timer" routing-animation>
        <div class="panel__head task">
            <div class="panel__task">
                <p class="task__id">
                    Task #{{item.issue.id}}
                </p>
                <div class="task__links-wrap">
                    <span class="task__link link" v-on:click="openTask">Link</span>
                    <span class="task__link link">Log</span>
                </div>
            </div>
            <div class="task__detail task__detail--wide">
                <h2 class="task__detail-heading task-heading">
                    {{item.issue.subject}}
                </h2>
                <div class="task__detail-info muted">
                    <span class="task__detail-item">
                        {{item.issue.assigned_to.name}}
                    </span>
                    <span class="task__detail-item">
                        {{item.issue.status.name}}
                    </span>
                    <span class="task__detail-item">
                        {{item.issue.done_ratio}}%
                    </span>
                </div>
            </div>
            <div class="task__controls-wrap">
                <transition name="fade">
                    <div class="task__control" v-if="!item.timer.stopped" v-on:click="pauseTimer">
                        <img src="/pause.svg" alt="">
                    </div>
                    <div class="task__control" v-else v-on:click="runTimer">
                        <img src="/play.svg" alt="">
                    </div>
                </transition>
                <div class="task__control" v-on:click="completeTimer">
                    <img src="/check.svg" alt="">
                </div>
                <div class="task__control" v-on:click="deleteTimer">
                    <img src="/delete.svg" alt="">
                </div>
            </div>
            <div v-timer="item" class="task__timer large-timer">
                {{item.formattedTime}}
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
                        <input v-bind:class="{ 'rt-input--invalid': formstate.time_count && (formstate.time_count.$invalid && formstate.$submitted)}"
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
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
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
      },
      deleteTimer: function () {
        this.$store.commit('deleteTimer', {id: this.item.id});
      },
      completeTimer: function () {
        this.$store.commit('completeTimer', {id: this.item.id});
      },
      pauseTimer: function () {
        this.item.timer.pause();
      },
      runTimer: function () {
        this.item.timer.start();
      }
    },
    props: ['item'],
    computed: {
      ...mapGetters(['url'])
    }
  };
</script>
