<template>
  <v-container class="fill-height" fluid>

    <!-- title -->
    <v-row class="mt-5">
      <v-col cols="12">
        <h1 class="display-2 text-center">
          Visualisation de données sur l'épidémie du <span class="underline">coronavirus</span> en france
        </h1>
      </v-col>
    </v-row>

    <!-- subtitle -->
    <v-row>
      <v-col cols='12' class='mt-5'>
        <h2 class='display-1 text-center'>
          Source des données
        </h2>
      </v-col>
    </v-row>

    <!-- sources -->
    <v-row>
      <!-- source 1 -->
      <v-col cols='12' sm='4' class='mt-5'>
        <card
          title='Santé Publique France'
          img='sante-publique-france.png'
          subtitle="
            L'organisme chargé de surveiller la dynamique de l'épidémie
            sur le territoire national publie quotidiennement un bulletin d'information sur l'évolution de la situation en france."
          link="https://www.data.gouv.fr/fr/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/"
        ></card>
      </v-col>
      <!-- source 2 -->
      <v-col cols='12' sm='4' class='mt-5'>
        <card
          title='Johns Hopkins University'
          img='johns-hopkins-university.png'
          subtitle="
            L'université agrège et met à disposition les données officielles de très nombreux pays sur l'épidémie du coronavirus.
            On y trouve notamment chaque jour le nombre de cas confirmés et le nombre de décès liés au virus."
          link="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports"
        ></card>
      </v-col>
      <!-- source 3 -->
      <v-col cols='12' sm='4' class='mt-5'>
        <card
          title='Ministère des solidarités et de la santé'
          img='ministere-sante.png'
          subtitle="
            L'enquête SAE (Statistique annuelle des établissements de santé) menée en 2018 par le Ministère de la Santé
            donne un bon indicateur du nombre de lits dédiés à la «réanimation adulte» dans les départements français."
          link="https://drees.solidarites-sante.gouv.fr/etudes-et-statistiques/publications/panoramas-de-la-drees/article/les-etablissements-de-sante-edition-2018"
        ></card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    Card,
  }
}
</script>
