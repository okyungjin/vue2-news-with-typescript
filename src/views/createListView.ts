// HOC
/* eslint-disable */
import { CreateElement } from 'vue/types/umd';
import ListView from './ListView.vue';
import { spinnerMixin } from '../mixins/spinnerMixin';

export default (routeName: string) => ({
  name: routeName,
  mixins: [spinnerMixin],
  render(h: CreateElement) {
    return h(ListView);
  },
});