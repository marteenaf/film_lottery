<template>
  <div class="progress-wrapper">
    <h4 v-if="showText" class="text">{{ value }}/{{ subtotal }}/{{ total }}</h4>
    <div class="bar" :style="getVars">
      <div class="value-bar"></div>
      <div class="subtotal-bar"></div>
      <div class="total-bar"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ListProgressBar",
  props: {
    value: Number,
    subtotal: Number,
    total: Number,
    barHeight: Number,
    showText: Boolean
  },
  computed: {
    getVars() {
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
      };
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
  background: rgb(var(--v-theme-primary));
  width: var(--width-value);
  border-radius: var(--border-rounded) var(--value-rounded) var(--value-rounded) var(--border-rounded);
}

.subtotal-bar {
  height: 100%;
  background-color: rgb(var(--v-theme-primary));
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
  margin: 10px 0px;
  gap: 10px
}
</style>