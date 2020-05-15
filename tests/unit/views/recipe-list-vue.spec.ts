import { shallowMount } from '@vue/test-utils';
import RecipeList from '@/views/RecipeList.vue';

describe('RecipeList.vue', () => {
  it('should render the liste of recipe', () => {
    const recipeList = ['Plat 1', 'Plat 2', 'Plat 3'];
    const wrapper = shallowMount(RecipeList, {
      data() {
        return {
          recipes: recipeList,
        };
      },
    });
    expect(wrapper.findAll('li').length).toBe(3);
    wrapper.findAll('li').wrappers.forEach((el, index) => {
      expect(el.text()).toBe(recipeList[index]);
    });
  });
});
