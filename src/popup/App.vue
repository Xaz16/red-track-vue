<template>
    <div class="pos-rel h-100">
        <router-view></router-view>
        <alert></alert>
    </div>
</template>
<script>
  import Alert from '../components/blocks/alert.vue';

  export default {
    components: {
      Alert
    },
    data () {
      return {};
    }
  };
</script>
