<template>
  <div
    class="card"
    :style="{
      backgroundColor: selected ? '#050040' : 'white',
      color: selected ? 'white' : 'black',
      cursor: selected != null ? 'pointer' : 'auto',
    }"
    :class="{
      outline: darkborder,
      all: darkborderstyle == 'all',
      top: darkborderstyle == 'top',
      middle: darkborderstyle == 'middle',
      bottom: darkborderstyle == 'bottom',
    }"
    @mouseover="mouseOver"
    @mouseout="mouseOut"
    @click="clicked"
  >
    <div v-if="title != null">
      <h6>{{ title }}</h6>
      <p v-if="subtitle != null" class="de-emphasized small">
        {{ subtitle }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Modal-Card",
  props: {
    title: {
      validator: (value) => value === null || typeof value === "string",
      default: null,
    },
    subtitle: {
      validator: (value) => value === null || typeof value === "string",
      default: null,
    },
    selected: {
      validator: (value) => value === null || typeof value === "boolean",
      default: null,
    },
    darkborder: {
      validator: (value) => value === null || typeof value === "boolean",
      default: false,
    },
    darkborderstyle: {
      validator: (value) => value === null || typeof value === "string",
      default: null,
    },
  },
  methods: {
    mouseOver(e) {
      this.$emit("mouseover", e);
    },
    mouseOut(e) {
      this.$emit("mouseout", e);
    },
    clicked() {
      if (this.selected != null) {
        this.$emit("select");
      }
    },
  },
};
</script>

<style scoped lang="scss">
$dark-border-color: rgb(135, 158, 179);

.card {
  background-color: var(--white);
  box-shadow: 0 0.0625rem 0.25rem 0 rgba(159, 161, 195, 0.3);
  border-radius: 0.125rem 0.125rem 0.125rem 0.125rem;
  padding: 1.25rem;
}

.card.outline {
  box-shadow: none;
  border-left: 2px solid $dark-border-color;
  border-right: 2px solid $dark-border-color;
  border-radius: 0;
}

.card.outline.all {
  border: 2px solid $dark-border-color;
  border-radius: 0.25rem;
}

.card.outline.top {
  border-top: 2px solid $dark-border-color;
  border-radius: 0.25rem 0.25rem 0 0; /* topleft topright bottomright bottomleft */
}

.card.outline.bottom {
  border-bottom: 2px solid $dark-border-color;
  border-radius: 0 0 0.25rem 0.25rem; /* topleft topright bottomright bottomleft */
}
</style>
