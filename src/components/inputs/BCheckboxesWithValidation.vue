<template>
    <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
        <div class="block">
            <slot/>
            <p class="has-text-danger">{{ errors[0] }}</p>
        </div>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'BCheckboxesWithValidation',
  components: {
    ValidationProvider,
  },
  props: {
    vid: {
      type: String,
    },
    rules: {
      type: [Object, String],
      default: '',
    },
  },
};
</script>

<style scoped>

</style>
