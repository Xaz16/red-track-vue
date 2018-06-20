<template>
    <root>
        <h1 class="page-heading" routing-animation>Timers</h1>
        <div class="content" v-if="timers && timers.length">
            <transition-group tag="div" name="fade">
                <Timer v-for="timer in timers" v-bind:key="timer.id" v-bind:item="timer"/>
            </transition-group>
        </div>
        <div class="hide-placeholders">
            <div class="placeholder gradient" v-for="item in [1,2,3,4,5,6,7]" v-bind:key="item"></div>
        </div>
    </root>
</template>
<script>
  import root           from '../layout/popup.vue';
  import { Timer }      from '../blocks/panels';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      root,
      Timer
    },
    data () {
      return {};
    },
    computed: {
      ...mapGetters(['timers'])
    }
  };
</script>
