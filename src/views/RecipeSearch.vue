<template>
    <section>
        <b-table
                :data="recipes"
                :loading="loading"
                paginated
                backend-pagination
                @page-change="onPageChange"
                :per-page="perPage"
                :total="total"
                :pagination-simple="false"
                striped

                backend-sorting
                :default-sort-direction="defaultSortOrder"
                :default-sort="[sortField, sortOrder]"
                sort-icon="menu-up"
                aria-next-label="Page suivante"
                aria-previous-label="Page précédente"
                aria-page-label="Page"
                aria-current-label="Page courante">
            <template slot-scope="props">
                <b-table-column field="name" label="Titre" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="preparationTime"
                                label="Temps de préparation (min)"
                                sortable
                                centered
                                numeric>
                    {{ props.row.preparationTime }}
                </b-table-column>

                <b-table-column field="waitingTime"
                                label="Temps d'attente (min)"
                                sortable
                                centered
                                numeric>
                    {{ props.row.waitingTime }}
                </b-table-column>

                <b-table-column field="cookingTime"
                                label="Temps de cuisson (min)"
                                sortable
                                centered
                                numeric>
                    {{ props.row.cookingTime }}
                </b-table-column>

                <b-table-column label="Tags">
                    <span>
                    <b-taglist>
                        <b-tag type="is-info"
                               v-for="tag in props.row.tags"
                               :key="tag">
                            {{tag}}
                        </b-tag>
                    </b-taglist>
                    </span>
                </b-table-column>
                <b-table-column label="Actions">

                </b-table-column>
            </template>
        </b-table>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import recipeService from '@/services/recipe-service';
import { Recipe } from '@/models/recipe';

export default Vue.extend({
  name: 'RecipeSearch',
  data() {
    return {
      page: 1,
      perPage: 5,
      total: 0,
      sortField: 'name',
      sortOrder: 'asc',
      defaultSortOrder: 'asc',
      recipes: [] as Recipe[],
      loading: false,
    };
  },
  mounted() {
    this.getRecipes();
  },
  methods: {
    getRecipes() {
      const first = this.page * this.perPage - this.perPage;
      const last = this.page * this.perPage - 1;
      this.loading = true;
      recipeService.searchRecipes(first, last).then((pagination) => {
        this.recipes = pagination.items;
        this.total = pagination.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    onPageChange(page: number) {
      this.page = page;
      this.getRecipes();
    },
  },
});
</script>

<style scoped>

</style>
