<template>
    <section class="content">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <BInputWithValidation id="url"
                                  rules="required|url"
                                  type="url"
                                  label="URL de la recette"
                                  v-model="recipe.url"
                                  placeholder="URL de la recette"
                                  icon="globe"
                                  data-test="url"/>
            <div v-if="imported">
                <BInputWithValidation id="name"
                                      rules="required"
                                      type="text"
                                      label="Nom"
                                      v-model="recipe.name"
                                      placeholder="Nom de la recette"
                                      data-test="name"/>
                <ValidationProvider v-slot="{ errors, valid }"
                                    :rules="`${hasUpload? 'image':''}`"
                                    name="Image"
                                    ref="uploadProvider">
                    <b-field label="Image"
                             :message="errors"
                             :type="{ 'is-danger': errors[0], 'is-success': valid }">
                        <b-field>
                            <b-upload v-model="uploadFile"
                                      drag-drop
                                      expanded
                                      @input="getFileData"
                                      data-test="upload">
                                <section class="section">
                                    <div class="content has-text-centered">
                                        <p v-if="!image">
                                            <b-icon icon="upload" size="is-large">
                                            </b-icon>
                                        </p>
                                        <figure class="image" v-if="image">
                                            <img :src="image" alt="Image de la recette"/>
                                        </figure>
                                        <p>{{fileName}}</p>
                                    </div>
                                </section>
                            </b-upload>
                        </b-field>
                    </b-field>
                </ValidationProvider>
                <b-field label="Temps de préparation (min.)">
                    <b-input placeholder="30"
                             type="number"
                             min="0"
                             v-model="recipe.preparationTime"
                             data-test="preparationTime"
                    >
                    </b-input>
                </b-field>
                <b-field label="Temps d'attente (min.)">
                    <b-input placeholder="15"
                             type="number"
                             min="0"
                             v-model="recipe.waitingTime"
                             data-test="waitingTime">
                    </b-input>
                </b-field>
                <b-field label="Temps de cuisson (min.)">
                    <b-input placeholder="55"
                             type="number"
                             min="0"
                             v-model="recipe.cookingTime"
                             data-test="cookingTime">
                    </b-input>
                </b-field>
                <b-field :label="ingredientTitle">
                    <b-input type="textarea"
                             minlength="10"
                             placeholder="Un ingrédient par ligne"
                             v-model="ingredientText">
                    </b-input>
                </b-field>
                <b-field label="Etiquettes">
                    <b-taginput
                            v-model="recipe.tags"
                            ellipsis
                            icon="tags"
                            rounded
                            placeholder="Ajouter une étiquette"
                            data-test="tags"
                            autocomplete
                            :allow-new="true"
                            :open-on-focus="true"
                            :data="filteredTags"
                            @typing="getFilteredTags"
                    >
                    </b-taginput>
                </b-field>
                <div class="buttons">
                    <b-button
                            id="add"
                            @click="handleSubmit(submit)"
                            type="is-success"
                            icon-left="check"
                            :loading="loading"
                            data-test="submit"
                    >
                        Ajouter
                    </b-button>
                    <b-button
                            id="reset"
                            @click="reset"
                            icon-left="redo"
                            data-test="reset"
                    >
                        Réinitialiser
                    </b-button>
                </div>
            </div>
            <div v-if="!imported" class="buttons">
                <b-button
                        id="import"
                        @click="handleSubmit(importRecipe)"
                        type="is-success"
                        icon-left="check"
                        :loading="importing"
                        data-test="import"
                >
                    Importer
                </b-button>
                <b-button
                        id="pass"
                        @click="passImport"
                        type="is-danger"
                        icon-right="forward"
                        data-test="pass"
                >
                    Passer l'import
                </b-button>
            </div>
        </ValidationObserver>
    </section>
</template>

<script lang="ts">
import recipeService from '@/services/recipe-service';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Vue from 'vue';
import { Recipe } from '@/models/recipe';
import Utils from '@/services/utils';
import BInputWithValidation from '../../components/inputs/BInputWithValidation.vue';

const reader = new FileReader();
export default Vue.extend({
  name: 'RecipeCreate',
  components: {
    ValidationObserver,
    ValidationProvider,
    BInputWithValidation,
  },
  data() {
    return {
      recipe: {} as Recipe,
      ingredientText: '',
      uploadFile: null as File | null,
      loading: false,
      imported: false,
      importing: false,
      filteredTags: [] as string[],
      allTags: [] as string[],
    };
  },
  computed: {
    hasUpload(): boolean {
      return !!this.uploadFile;
    },
    fileName(): string {
      return this.uploadFile ? this.uploadFile.name : 'Envoyer une image';
    },
    image(): string {
      return this.recipe.image ? this.recipe.image : '';
    },
    ingredientTitle() {
      let title = 'Ingrédients';
      if (this.recipe.nbPortions) {
        title += ` (${this.recipe.nbPortions} personnes)`;
      }
      return title;
    },
  },
  async mounted() {
    await this.getAllTags();
    this.getFilteredTags('');
  },
  methods: {
    reset() {
      this.recipe = { _id: null, name: '', ingredients: [] };
      this.imported = false;
      requestAnimationFrame(() => {
        (this.$refs.observer as InstanceType<typeof ValidationObserver>).reset();
      });
    },
    async submit() {
      this.loading = true;
      this.recipe.ingredients = await recipeService.getIngredients(this.ingredientText.trim());
      recipeService.add(this.recipe)
        .then(() => {
          this.$router.push({ name: 'RecipeList' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async getFileData(value: File) {
      const valid = await
      (this.$refs.uploadProvider as InstanceType<typeof ValidationProvider>).validate(value);

      if (valid) {
        reader.addEventListener('load', () => {
          this.recipe.image = reader.result as string;
        });
        reader.readAsDataURL(value);
      } else {
        this.recipe.image = undefined;
      }
    },
    importRecipe() {
      this.importing = true;
      recipeService.import(this.recipe.url).then((recipe) => {
        this.recipe = recipe;
        let ingredients = '';
        if (this.recipe.ingredients && this.recipe.ingredients.length > 0) {
          this.recipe.ingredients.forEach((ingredient) => {
            ingredients += `${Utils.prettyPrint(ingredient)}\n`;
          });
        }
        this.ingredientText = ingredients;
        this.imported = true;
      })
        .finally(() => {
          this.importing = false;
        });
    },
    passImport() {
      this.imported = true;
    },
    getFilteredTags(text: string) {
      console.log(`getFilteredTags : ${text}`);
      console.log(this.allTags);
      this.filteredTags = this.allTags.filter((option) => option
        .toString()
        .toLowerCase()
        .indexOf(text.toLowerCase()) >= 0);
      console.log(this.filteredTags);
    },
    async getAllTags() {
      this.allTags = await recipeService.getAllTags();
    },
  },
});
</script>

<style scoped>
    .buttons {
        margin-top: 1em;
    }
</style>
