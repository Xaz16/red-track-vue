<template>
    <root>
        <h1 routing-animation class="page-heading">Tasks</h1>
        <div class="panel-wrapper">
            <div class="panel" v-for="task in tasks">
                <div class="panel__head task">
                    <div class="panel__task">
                        <div class="task__id">
                            Task #{{task.id}}
                        </div>
                        <div class="task__links-wrap">
                            <a class="task__link link">Link</a>
                            <a class="task__link link">Start timer</a>
                            <a class="task__link link">Stop timer</a>
                        </div>
                    </div>
                    <div class="task__detail task__detail--wide">
                        <h2 class="task__detail-heading task-heading">
                            {{task.subject}}
                        </h2>
                        <div class="task__detail-info muted">
                                <span class="task__detail-item">
                                    Timers: 2
                                </span>
                            <span class="task__detail-item">
                                    Assignee: {{task.assigned_to.name}}
                                </span>
                            <span class="task__detail-item">
                                    Status: {{task.status.name}}
                                </span>
                            <span class="task__detail-item">
                                    Done: {{task.done_ratio}}%
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </root>
</template>
<script>
  import root from '../layout/root.vue';

  export default {
    components: {
      root
    },
    data () {
      return {
        tasks: []
      }
    },
    async beforeMount () {
      const response = await window.requester.getAssignedTasks();
      this.$data.tasks = response.issues;
      console.log(this.$data.tasks)
    }
  };
</script>
