<template>
    <div id="app">
        <appHeader/>
        <main class="main-content">
            <slot></slot>
        </main>
    </div>
</template>
<script>
  import appHeader          from '../blocks/Header.vue';
  import { makeTransition } from '../../utils';

  export default {
    components: {
      appHeader
    },
    mounted () {
      makeTransition();
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
