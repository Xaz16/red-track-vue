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
                            {{wrongCredentialsMessage}}</p>
                        <p class="messages__item error-text" v-if="messages.showCheckFieldsMessage">
                            {{checkFieldsMessage}}</p>
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
  import root      from '../layout/root.vue';
  import Requester from '../../Services/Requester';

  export default {
    components: {
      root
    },
    async beforeMount () {
      let key;
      let url;
      const store = await window.storage.getInstance.get();
      if (!store.lastSetted) {
        key = store.key;
        url = store.url;
      } else {
        key = store.lastSetted.key;
        url = store.lastSetted.url;
      }
      this.$data.model = {
        url,
        key
      };
    },
    data () {
      return {
        messages: {
          showCheckFieldsMessage: false,
          showWrongCredentialsMessage: false
        },
        formIsBusy: false,
        wrongCredentialsMessage: `Can't extract any data with provided credentials. Please, double check your credentials.
        If you are sure that credentials is right, please ask your redmine administrator if the API is enabled`,
        checkFieldsMessage: `All fields are required. Make sure that you type correct url`,
        formstate: {},
        model: {
          url: '',
          key: ''
        }
      };
    },
    watch: {
      model: {
        handler: async function (newVal) {
          const key = newVal.key;
          const url = newVal.url;
          window.storage.getInstance.set({key, url});
        },
        deep: true
      }
    },
    methods: {
      checkCredentials: async function () {
        const requester = new Requester(this.model.key, this.model.url);
        return {instance: requester, data: requester.getUser()};
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
        if (!userResponse) {
          return this.$set(this.messages, 'showWrongCredentialsMessage', true);
        }
        window.storage.getInstance.set(userResponse.data);
        window.storage.getInstance.set({lastSetted: {url: this.model.url, key: this.model.key}});
        window.requester = userResponse.instance;
        this.$router.push('/tasks');
      }
    }
  };
</script>
