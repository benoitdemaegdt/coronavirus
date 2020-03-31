<template>
  <v-card class="mx-auto" max-width="400">
    <v-img height="200px" :src="require('@/assets/' + img)"></v-img>
    <v-card-subtitle class="pb-0">{{ title }}</v-card-subtitle>
    <v-card-text class="text--primary">
      <p>{{ subtitle }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :href="link"
        target='_blank'
        >
          Voir les données
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    img: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    link: { type: String, required: true },
  },
}
</script>

<style scoped>
  .container {
    width: 85%;
    max-width: 1200px;
    padding: 0px;
  }

  .underline {
    text-decoration: underline #1565C0;
  }
</style>
