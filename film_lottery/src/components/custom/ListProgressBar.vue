<template>
  <div class="progress-wrapper">
    <p v-if="showText"><strong>{{ generalLabel }}</strong></p>
  </div>
  <div class="progress-wrapper">
    <div class="bar" :style="getVars">
      <div class="value-bar"></div>
      <div class="subtotal-bar"></div>
      <div class="total-bar"></div>
    </div>
  </div>
  <div class="progress-wrapper">
    <p v-if="showText" class="text">{{ value }} {{ valueLabel }} / {{ subtotal }} {{
      subtotalLabel }}</p>
    <v-spacer></v-spacer>
    <p>{{ total }} {{ totalLabel || 'total' }}</p>
  </div>
</template>
<script lang="ts">
export default {
  name: "ListProgressBar",
  props: {
    value: Number,
    subtotal: Number,
    total: Number,
    barHeight: Number,
    showText: Boolean,
    valueLabel: String,
    subtotalLabel: String,
    totalLabel: String,
    colorTheme: String,
    generalLabel: String
  },
  computed: {
    getVars() {
      console.debug(this.$vuetify.theme.current.colors);
      let vars = {
        "--width-subTotal": ((this.subtotal - this.value) / this.total) * 100 + "%",
        "--width-total": (((this.total - this.subtotal) / this.total) * 100) + "%",
        "--width-value": (this.value / this.total) * 100 + "%",
        "--border-rounded": this.barHeight / 2 + "px",
        "--bar-height": this.barHeight + "px",
        "--subtotal-rounded-left": this.value == 0 ? this.barHeight / 2 + "px" : "0px",
        "--subtotal-rounded-right": this.subtotal == this.total ? this.barHeight / 2 + "px" : "0px",
        "--total-rounded": this.subtotal == 0 ? this.barHeight / 2 + "px" : "0px",
        "--value-rounded": this.value == this.total ? this.barHeight / 2 + "px" : "0px",
        "--value-color": (this.colorTheme ? this.$vuetify.theme.current.colors[this.colorTheme] : this.$vuetify.theme.current.colors["primary"]),
      };
      console.debug(vars["--value-color"]);
      return vars;
    },
  }
};
</script>
<style scoped>
.bar {
  height: var(--bar-height);
  display: flex;
  flex-direction: row;
  border: solid;
  border-radius: var(--border-rounded);
  flex-grow: 1;

}

.value-bar {
  height: 100%;
  background: var(--value-color);
  width: var(--width-value);
  border-radius: var(--border-rounded) var(--value-rounded) var(--value-rounded) var(--border-rounded);
}

.subtotal-bar {
  height: 100%;
  background-color: var(--value-color);
  opacity: 0.5;
  width: var(--width-subTotal);
  border-radius: var(--subtotal-rounded-left) var(--subtotal-rounded-right) var(--subtotal-rounded-right) var(--subtotal-rounded-left);
}

.total-bar {
  height: 100%;
  background-color: lightgrey;
  width: var(--width-total);
  border-radius: var(--total-rounded) var(--border-rounded) var(--border-rounded) var(--total-rounded);
}

.progress-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  /*margin: 4px 0px;*/
  padding: 2px 0px;
}
</style>