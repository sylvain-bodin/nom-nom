<template>
    <section class="content">
        <h3 class="title is-5">Ajouter une recette</h3>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <BInputWithValidation
                    id="name"
                    rules="required"
                    type="text"
                    label="Nom"
                    v-model="recipe.name"
                    placeholder="Nom de la recette"
                    data-test="name"
            />
            <BInputWithValidation
                    id="url"
                    rules="required|url"
                    type="url"
                    label="URL de la recette"
                    v-model="recipe.url"
                    placeholder="URL de la recette"
                    icon="globe"
                    data-test="url"
            />
            <ValidationProvider
                    v-slot="{ errors, valid }"
                    :rules="`${hasUpload? 'image':''}`"
                    name="Image"
                    ref="uploadProvider"
            >
                <b-field
                        label="Image"
                        :message="errors"
                        :type="{ 'is-danger': errors[0], 'is-success': valid }"
                >
                    <b-field>
                        <b-upload
                                v-model="uploadFile"
                                drag-drop
                                expanded
                                @input="getFileData"
                                data-test="upload"
                        >
                            <section class="section">
                                <div class="content has-text-centered">
                                    <p>
                                        <b-icon icon="upload" size="is-large"></b-icon>
                                    </p>
                                    <p>{{fileName}}</p>
                                </div>
                            </section>
                        </b-upload>
                    </b-field>
                </b-field>
            </ValidationProvider>
            <b-field label="Etiquettes">
                <b-taginput
                        v-model="recipe.tags"
                        ellipsis
                        icon="label"
                        rounded
                        placeholder="Ajouter une étiquette"
                        data-test="tags"
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
        </ValidationObserver>
    </section>
</template>

<script lang="ts">
import RecipeService from '@/services/recipe-service';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Vue from 'vue';
import { RecipeModel } from '@/models/recipe-model';
import BInputWithValidation from '../components/inputs/BInputWithValidation.vue';

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
      recipe: {} as RecipeModel,
      uploadFile: null as File | null,
      loading: false,
    };
  },
  computed: {
    hasUpload(): boolean {
      return !!this.uploadFile;
    },
    fileName(): string {
      return this.uploadFile ? this.uploadFile.name : 'Envoyer une image';
    },
  },
  methods: {
    reset() {
      this.recipe = { _id: null, name: '' };
      requestAnimationFrame(() => {
        (this.$refs.observer as InstanceType<typeof ValidationObserver>).reset();
      });
    },
    submit() {
      this.loading = true;
      RecipeService.add(this.recipe)
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
  },
});
</script>

<style scoped>
    .buttons {
        margin-top: 1em;
    }
</style>
