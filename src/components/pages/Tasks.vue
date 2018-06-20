<template>
    <root>
        <h1 class="page-heading" routing-animation>Tasks</h1>
        <div class="content" v-if="tasks && tasks.length">
            <Task v-for="task in tasks" v-bind:key="task.id" v-bind:item="task"/>
        </div>
        <div class="hide-placeholders">
            <div class="placeholder gradient" v-for="item in [1,2,3,4,5,6, 7]" v-bind:key="item"></div>
        </div>
    </root>
</template>
<style lang="scss">

</style>
<script>
  import root           from '../layout/popup.vue';
  import { Task }       from '../blocks/panels';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      root,
      Task
    },
    data () {
      return {};
    },
    beforeMount () {
      this.$store.dispatch('getTasks');
    },
    computed: {
      ...mapGetters(['tasks'])
    }
  };
</script>
