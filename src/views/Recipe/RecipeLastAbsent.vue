<template>
    <div>
        <p class="is-size-3 has-text-centered">
            Oups !<br/>
            Il semblerait que vous n'ayez pas encore de recettes.<br/>
            Cliquez ici pour en ajouter.
        </p>
        <div class="has-text-centered">
            <b-button
                    tag="router-link"
                    to="/recipe/create"
                    size="is-large"
                    icon-right="plus"
                    data-test="add-recipe"
            >
                Ajouter une recette
            </b-button>
        </div>
    </div>
</template>
<script lang="ts">
export default {
  name: 'RecipeLastAbsent',
};
</script>
