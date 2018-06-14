<template>
    <div id="app">
        <appHeader/>
        <main class="main-content">
            <slot></slot>
        </main>
    </div>
</template>
<script>
  import appHeader from '../blocks/app-header.vue';

  export default {
    components: {
      appHeader
    },
    mounted () {
      const els = Array.from(this.$el.querySelectorAll('[routing-animation]'));
      els.forEach((el, index) => {
        setTimeout(() => el.classList.add('is-preparedRoutingAnimation'), 50 * index);
      });
    },
    data () {
      return {};
    }
  };
</script>
<style lang="scss">
    @import "../../scss/root";

    .main-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        padding: 18px 15px 0;
    }
</style>
