import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import RecipeList from '@/views/RecipeList.vue';
import Buefy from 'buefy';
import RecipeService from '@/services/recipe.service';

const localVue = createLocalVue();
localVue.use(Buefy);

const mockGetAll = jest.spyOn(RecipeService, 'getAll');
const recipeList = [
  {
    id: 1,
    name: 'Recette 1',
  },
  {
    id: 2,
    name: 'Recette 2',
  },
  {
    id: 3,
    name: 'Recette 3',
  },
];

function createWrapper() {
  return shallowMount(RecipeList, {
    localVue,
    stubs: ['router-link', 'router-view'],
  });
}

describe('RecipeList.vue', () => {
  it('should render the list of recipe', async () => {
    // given
    mockGetAll.mockImplementation(() => Promise.resolve(recipeList));
    const wrapper = createWrapper();

    // when
    await Vue.nextTick(); // Rendering the data
    await Vue.nextTick(); // Showing the list

    // then
    console.log(wrapper.html());
    expect(wrapper.findAll('li').length).toBe(3);
    wrapper.findAll('li').wrappers.forEach((el, index) => {
      expect(el.text()).toBe(recipeList[index].name);
    });
    expect(wrapper.contains('b-skeleton-stub[active]')).toBe(false);
  });

  it('should render a skeleton while loading', async () => {
    // given


    // when
    const wrapper = createWrapper();

    // then
    expect(wrapper.contains('b-skeleton-stub[active]')).toBe(true);
  });
});
