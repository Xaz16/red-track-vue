<template>
    <root>
        <div class="auth">
            <h1 class="page-heading w100" routing-animation>
                Authorization
            </h1>

            <vue-form class="auth__form" :state="formstate" @submit.prevent="onSubmit">
                <div routing-animation>
                    <validate tag="div" class="auth__form-input">
                        <input v-bind:class="{ 'rt-input--invalid': formstate.url && (formstate.url.$invalid  && formstate.$submitted)}"
                               type="url" class="rt-input rt-input--wide" name="url" placeholder="Redmine URL"
                               v-model="model.url" required>
                        <div class="err-messages"></div>
                    </validate>
                </div>
                <div routing-animation>
                    <validate tag="div" class="auth__form-input">
                        <input v-bind:class="{ 'rt-input--invalid': formstate.key && (formstate.key.$invalid && formstate.$submitted)}"
                               type="text" class="rt-input rt-input--wide" name="key" placeholder="Redmine API key"
                               v-model="model.key" required>
                        <div class="err-messages"></div>
                    </validate>
                </div>
                <div class="messages">
                    <transition name="fade">
                        <p class="messages__item error-text" v-if="messages.showWrongCredentialsMessage">
                            {{messagesText.wrongCredentials}}</p>
                        <p class="messages__item error-text" v-if="messages.showCheckFieldsMessage">
                            {{messagesText.checkFields}}</p>
                    </transition>
                </div>
                <button v-bind:disabled="formstate.$pending" type="submit" class="auth__btn btn mla" routing-animation>
                    Set
                </button>
            </vue-form>
        </div>
    </root>
</template>
<script>
  import root         from '../layout/popup.vue';
  import Requester    from '../../Services/Requester';
  import messagesText from '../../utils/messages';

  export default {
    components: {
      root
    },
    computed: {
      model: {
        get: function () {
          return {url: this.$store.getters.url, key: this.$store.getters.key};
        },
        set: function (newVal) {
          return this.$store.commit('currentAuthData', newVal);
        }
      }
    },
    data () {
      return {
        messagesText,
        messages: {
          showCheckFieldsMessage: false,
          showWrongCredentialsMessage: false
        },
        formIsBusy: false,
        formstate: {}
      };
    },
    methods: {
      checkCredentials: async function () {
        const requester = new Requester(this.model.key, this.model.url);
        return {instance: requester, data: await requester.getUser()};
      },
      resetMessages: function () {
        this.$set(this.messages, 'showWrongCredentialsMessage', false);
        this.$set(this.messages, 'showCheckFieldsMessage', false);
      },
      onSubmit: async function () {
        this.resetMessages();
        if (this.formstate.$invalid) {
          return this.$set(this.messages, 'showCheckFieldsMessage', true);
        }
        const userResponse = await this.checkCredentials();
        if (!userResponse.data) {
          console.log(userResponse.data, this.model.key, this.model.url);
          return this.$set(this.messages, 'showWrongCredentialsMessage', true);
        }
        this.$store.commit('user', userResponse.data);
        this.$store.commit('validAuthData', {url: this.model.url, key: this.model.key});
        window.requester = userResponse.instance;
        this.$router.push('/tasks');
      }
    }
  };
</script>
