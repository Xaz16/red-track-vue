<template>
    <root>
        <h1 class="page-heading" routing-animation>Logs</h1>
        <div class="content" v-if="logs && logs.length">
            <Log v-for="log in logs" v-bind:key="log.id" v-bind:item="log"/>
        </div>
        <div class="hide-placeholders">
            <div class="placeholder gradient" v-for="item in [1,2,3,4,5,6,7]" v-bind:key="item"></div>
        </div>
    </root>
</template>
<script>
  import root    from '../layout/popup.vue';
  import { Log } from '../blocks/panels';

  export default {
    components: {
      root,
      Log
    },
    data () {
      return {
        logs: []
      };
    }
  };
</script>
