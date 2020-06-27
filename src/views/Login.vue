<template>
    <div class="has-text-centered">
        <div class="my-2">
            <b-button type="is-info"
                      rounded
                      size="is-medium"
                      icon-left="facebook"
                      icon-pack="fab"
                      tag="a"
                      :href="baseUrl+'/auth/facebook'">
                Se connecter avec Facebook
            </b-button>
        </div>
        <div class="my-2">
            <b-button type="is-info"
                      rounded
                      size="is-medium"
                      icon-left="twitter"
                      icon-pack="fab"
                      tag="a"
                      :href="baseUrl+'/auth/twitter'">
                Se connecter avec Twitter
            </b-button>
        </div>
        <div class="my-2">
            <b-button type="is-danger"
                      rounded
                      size="is-medium"
                      icon-left="google"
                      icon-pack="fab"
                      class="google"
                      tag="a"
                      :href="baseUrl+'/auth/google'">
                Se connecter avec Google
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_URL,
    };
  },
});
</script>

<style scoped>
    .my-2 {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .button.google {
        background-color: #ff0537;
        border-color: transparent;
        color: white;
    }

    .button.google:hover {
        background-color: rgba(255, 5, 55, 0.9);
    }
</style>
