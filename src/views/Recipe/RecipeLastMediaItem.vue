<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-48x48">
                <img :src="recipe.image" alt="Aperçu de la recette">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <router-link :to="{name:'Recipe', params:{id: recipe._id}}">
                        <strong>{{recipe.name}}</strong>
                    </router-link>
                </p>
            </div>

        </div>
        <div class="media-right">
            <button class="delete" @click="$emit('delete-recipe',recipe._id)"></button>
        </div>
    </article>
</template>
<script lang="ts">
import { Recipe } from '@/models/recipe';

export default {
  name: 'RecipeLastMediaItem',
  props: {
    recipe: {} as Recipe,
  },
  event: 'delete-recipe',
};
</script>
