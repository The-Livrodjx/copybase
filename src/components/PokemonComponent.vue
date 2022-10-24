<template>
  <img :src="image" />
  <h2>{{ name }}</h2>
  <div class="for-stats">
    <div class="hability" v-for="(stat, i) in habilities" :key="stat.url">
      <span>
        <v-icon :name="iconsName[i]" scale="1.5" />
        <p>{{ stat.stat.name }}</p>
        <p>{{ stat.base_stat }}</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    /* 
      iconsName (como é auto-descritivo) é um array que contém o nome dos Icons que utilizei
      com a lib oh-vue-icons
    */

    return {
      iconsName: [
        "co-heart",
        "ri-sword-line",
        "pr-shield",
        "gi-fire",
        "si-firebase",
        "si-speedtest",
      ],
    };
  },
  props: {
    name: String,
    image: String,
    habilities: Array,
  },
};
</script>

<style lang="scss" scoped>

h2::first-letter {
  text-transform: uppercase;
}

div.for-stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  div.hability {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  span {
    margin: 10px;
  }
}
</style>