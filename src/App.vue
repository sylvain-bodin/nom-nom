<template>
    <div id="app">
        <section class="hero is-light is-bold has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title"> NomNom</h1>
                    <h2 class="subtitle">Qu'allez-vous manger ce soir ?</h2>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<script>
export default {
};
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
