<template>
    <transition name="fade">
        <div class="global-alert-backdrop" v-if="globalAlert.show">
            <div class="global-alert">
                <div>
                    <h5 class="heading-1" v-if="globalAlert.heading">{{ globalAlert.heading }}</h5>
                    <p class="">{{ globalAlert.text }}</p>
                </div>
                <button class="btn" v-on:click="close">Close</button>
            </div>
        </div>
    </transition>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {};
    },
    computed: {
      ...mapGetters(['globalAlert'])
    },
    methods: {
      close () {
        this.globalAlert.callback && this.globalAlert.callback();
        this.$store.commit('globalAlert', {show: false});
      }
    }
  };
</script>
