<template>
    <div id="app">
        <section class="hero is-light is-bold has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title"> NomNom</h1>
                    <h2 class="subtitle">
                        Qu'allez-vous manger ce soir {{user ? user.name : ''}} ?
                    </h2>
                </div>
            </div>
            <div class="hero-foot" v-if="user">
                <nav class="tabs is-centered is-boxed ">
                    <div class="container">
                        <ul>
                            <router-link
                                    :to="{name:'RecipeList'}"
                                    v-slot="{ href, route, navigate, isActive }"
                            >
                                <li :class="[isActive && 'is-active']">
                                    <a :href="href" @click="navigate">Liste des recettes</a>
                                </li>
                            </router-link>
                            <router-link
                                    :to="{name:'RecipeCreate'}"
                                    v-slot="{ href, route, navigate, isActive }"
                            >
                                <li :class="[isActive && 'is-active']">
                                    <a :href="href" @click="navigate">Ajouter une recette</a>
                                </li>
                            </router-link>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import userService from '@/services/user-service';
import { User } from '@/models/user';

export default Vue.extend({
  data() {
    return {
      user: undefined as unknown as User,
    };
  },
  mounted() {
    userService.getConnectedUser().then((user) => {
      this.user = user;
    }).finally(() => {
      if (!this.user && this.$route.name !== 'Login') {
        this.$router.push({ name: 'Login' });
      }
    });
  },
});
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
