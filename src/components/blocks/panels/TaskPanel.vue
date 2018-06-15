<template>
    <div class="panel" routing-animation>
        <div class="panel__head task">
            <div class="panel__task">
                <p class="task__id">
                    Task #{{item.id}}
                </p>
                <div class="task__links-wrap">
                    <span class="task__link link" v-on:click="openTask">Link</span>
                    <span class="task__link link">Create timer</span>
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
        url: ''
      };
    },
    methods: {
      openTask: function () {
        chrome.tabs.create({url: `${this.url}/issues/${this.task.id}`});
      }
    },
    props: ['item']
  };
</script>
