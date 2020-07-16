import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Recipe from '@/views/Recipe/Recipe.vue';
import RecipeList from '@/views/Recipe/RecipeLast.vue';
import RecipeCreate from '@/views/Recipe/RecipeCreate.vue';
import Login from '@/views/Login.vue';
import RecipeSearch from '@/views/Recipe/RecipeSearch.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }, {
    path: '/recipe/list',
    alias: '/',
    name: 'RecipeList',
    component: RecipeList,
  }, {
    path: '/recipe/create',
    name: 'RecipeCreate',
    component: RecipeCreate,
  }, {
    path: '/recipe/search',
    name: 'RecipeSearch',
    component: RecipeSearch,
  }, {
    path: '/recipe/:id',
    name: 'Recipe',
    component: Recipe,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
