<template>
    <header class="header">
        <div class="logo">
            <img class="logo__icon" src="/assets/logo-icon.svg" alt="">
            <h2 class="logo__heading heading-1">Red Track</h2>
        </div>
        <nav class="navigation" v-if="allowNavigation">
            <router-link class="navigation__item" to="/timers" tag="div">
                <a class="navigation__item-link nav-item">Timers</a>
            </router-link>
            <router-link class="navigation__item" to="/tasks" tag="div">
                <a class="navigation__item-link nav-item">Tasks</a>
            </router-link>
            <router-link class="navigation__item" to="/logs" tag="div">
                <a class="navigation__item-link nav-item">Logs</a>
            </router-link>
        </nav>
        <div class="options">
            <router-link class="options__item" to="/auth" tag="div">
                <a class="options__item-link">
                    <img class="options__icon" src="/assets/options-icon.svg" alt="">
                </a>
            </router-link>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @import "../../scss/variables";

    .header {
        background-color: $dark;
        height: 52px;
        display: flex;
        padding: 0 15px;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo__icon {
        margin-right: 12px;
    }

    .logo__heading {
        margin: 0;
    }

    .navigation {
        display: flex;
        max-width: 345px;
    }

    .navigation__item {
        width: 115px;
        height: 52px;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    :not(.options__item).router-link-active {
        background-color: $accent;

        border-bottom: 2px solid $dark-accent;
    }

    .navigation__item-link {
        display: block;
        height: 100%;
        width: 100%;
        text-align: center;
        line-height: 52px;
        overflow: hidden;
        text-overflow: ellipsis;
        outline: none !important;

    }

    .options {
        cursor: pointer;
    }

    .options__item {
        height: 52px;
        width: 54px;
        position: relative;
        z-index: 1;
    }

    .options__item-link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% + 5px);
        height: 100%;
        top: 0;
        position: absolute;
        right: -15px;
        border-bottom: 2px solid $dark-bg;
    }

    .options__item.router-link-active {
        .options__item-link {
            background-color: $accent;
            border-bottom: 2px solid $dark-accent;
        }
    }

    .options__icon {
        position: relative;
        z-index: 1;
    }
</style>

<script>
  export default {
    computed: {
      allowNavigation: function () {
        return this.$store.getters.isLoggedIn;
      }
    }
  };
</script>
