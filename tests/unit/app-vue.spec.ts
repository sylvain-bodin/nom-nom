import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('should show the title and subtitle', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.get('h1').text()).toBe('NomNom');
    expect(wrapper.get('h2').text()).toBe('Qu\'allez-vous manger ce soir ?');
  });
});
