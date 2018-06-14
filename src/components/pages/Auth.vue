<template>
    <root>
        <div class="auth">
            <h1 class="page-heading w100" routing-animation>
                Authorization
            </h1>

            <form class="auth__form">
                <div class="auth__form-input" routing-animation>
                    <input type="text" class="rt-input rt-input--wide" name="url" placeholder="Redmine URL">
                    <div class="err-messages"></div>
                </div>
                <div class="auth__form-input" routing-animation>
                    <input type="text" class="rt-input rt-input--wide" name="api_key" placeholder="Redmine API key">
                    <div class="err-messages"></div>
                </div>
                <div class="auth__btn btn">
                    Set
                </div>
            </form>
        </div>
    </root>
</template>
<script>
  import root from '../layout/root.vue';

  export default {
    components: {
      root
    }
  };
</script>
