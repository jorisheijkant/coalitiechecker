<script setup>
// Add the pinia parties store here
import { usePartiesStore } from '@/stores/parties';

const partiesStore = usePartiesStore();

</script>

<template>
  <header class="header">
    <h1 class="title">Coalitiechecker</h1>
    <p class="lead">Mogelijke coalities na de Tweede Kamerverkiezingen van 2023.</p>
  </header>

  <main>
    <h2 class="h2 coalition-header">Coalities</h2>
    <p class="explainer">Met meerderheid in beide kamers, max 6 partijen.</p>
    <div class="coalitions">
      <div class="coalition" v-for="(coalition, index) in partiesStore.coalitions" :key="`coalition-${index}`">
        <p class="parties">{{ coalition.parties }}</p>
        <p class="seats">{{ coalition.seats }} zetels in Tweede Kamer</p>
        <p class="senate">{{ coalition.seatsSenate }} zetels in Eerste Kamer</p>
      </div>
    </div>

    <div class="all-parties">
      <h2 class="h2 coalition-header">Peilingen</h2>
      <p class="party" v-for="party in partiesStore.sortedParties" :key="`party-${party.name}`">
      {{ party.name }} - {{ party.parliament_projected }} zetels
      </p>
    </div>
    
  </main>
</template>

<style scoped>

</style>
