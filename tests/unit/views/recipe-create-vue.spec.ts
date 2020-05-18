import { createLocalVue, mount } from '@vue/test-utils';
import RecipeCreate from '@/views/RecipeCreate.vue';
import Buefy from 'buefy';
import recipeService from '@/services/recipe-service';
import flushPromises from 'flush-promises';

import fn = jest.fn;

const localVue = createLocalVue();
localVue.use(Buefy);

function createWrapper() {
  return mount(RecipeCreate, {
    localVue,
    stubs: ['router-link', 'router-view'],
    mocks: {
      $router: [],
    },
  });
}

xdescribe('RecipeCreate', () => {
  it('should create a recipe', async () => {
    // given
    recipeService.add = fn().mockImplementation(() => Promise.resolve());
    const wrapper = createWrapper();
    const inputName = wrapper.get('input#name');
    inputName.setValue('Test de recette');

    // when
    wrapper.get('button#add').trigger('click');
    await flushPromises();

    // then
    expect(recipeService.add).toHaveBeenCalledWith({ id: null, name: 'Test de recette' });
  });
});
