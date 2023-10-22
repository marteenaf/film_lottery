<template>
  <button :style="getStyle" class="pick-btn" @click="this.$emit('pick')" :disabled="disabled">{{ text || "PICK"
  }}</button>
</template>
<script>
export default {
  name: "PickButton",
  props: {
    text: String,
    color: String,
    textColor: String,
    shadowColor: String,
    disabled: Boolean,
  },
  computed: {
    getStyle() {
      return {
        "--background-color": this.color,
        "--text-color": this.textColor,
        "--shadow-color": this.shadowColor,
      };
    }
  }
};
</script>
<style scoped>
.pick-btn {
  background: var(--background-color);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  transform-style: preserve-3d;
  border: inherit;
  box-shadow: 0 10px 0 -1px var(--shadow-color), 0 20px 0 -1px var(--shadow-color), 0 21px 0 #2c3e50;
  border: solid #2c3e50;
  font-weight: 900;
  font-size: larger;
  color: var(--text-color);
  text-transform: uppercase;
}

.pick-btn:hover {
  filter: brightness(120%);
  /* box-shadow: 0 10px red; */
  /* transform: translate3d(0,10px,0); */
}

.pick-btn:active {
  transform: translate3d(0, 18px, 0);
  box-shadow: 0 2px 0 -1px var(--shadow-color), 0 3px 0 #2c3e50
}

.pick-btn:disabled {
  filter: saturate(25%);
  pointer-events: none;
}
</style>