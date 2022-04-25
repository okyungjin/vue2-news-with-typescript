<template>
  <div>
    <ListItem :items="newsItem"></ListItem>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { fetchList } from '@/api';
import ListItem from '../components/ListItem.vue';

export default Vue.extend({
  components: { ListItem },
  data() {
    return {
      newsItems: [],
    };
  },
  methods: {
    async fetchNewsItems() {
      const response: any = await fetchList('news');
      this.newsItems = response.data;
    },
  },
});
</script>
