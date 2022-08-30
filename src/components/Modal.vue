<template>
  <div class="modal-container">
    <div
      v-if="backdrop !== 'false' && fullscreen !== 'true'"
      class="backdrop"
    ></div>
    <div
      :class="{
        modal: !fullscreen,
        modalfullscreen: fullscreen,
        partialwidth: setPartialWidth,
      }"
    >
      <Card
        :style="{
          height: fullscreen ? '100%' : 'auto',
          overflowY: fullscreen ? '' : overflow,
          maxHeight: fullscreen ? '100%' : '70vmin',
        }"
      >
        <slot />
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "Popup-Modal",
  components: { Card },
  props: {
    overflow: {
      validator: (value) => value === "auto" || value === "none",
      default: "auto",
    },
    backdrop: {
      validator: (value) =>
        value === "static" || value === "true" || value === "false",
      default: "true",
    },
    footer: {
      validator: (value) => value === "true" || value === "false",
      default: "true",
    },
    header: {
      validator: (value) => value === "true" || value === "false",
      default: "true",
    },
    fullscreen: {
      validator: (value) => typeof value === "boolean",
      default: false,
    },
    // setPartialWidth sets the width to less than 100% (using hardcoded value) and centers in screen
    setPartialWidth: {
      validator: (value) => typeof value === "boolean",
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
h3 {
  text-align: center;
}

.modal-container {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
}

.modal {
  z-index: 1000;
  margin-top: 100px;
  animation-name: modalanimation;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  position: relative;
  min-width: 400px;

  &.partialwidth {
    animation: none;
  }
}

@keyframes modalanimation {
  from {
    opacity: 0;
    margin-top: 0px;
  }
  to {
    opacity: 1;
    margin-top: 100px;
  }
}

.modalfullscreen {
  z-index: 1000;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

.partialwidth {
  width: 80%;
  margin: auto auto;
}

.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

hr {
  border: 0;
  height: 1px;
  margin-top: 10px;
  margin-bottom: 20px;
  background: #d7dfe1;
  background-image: linear-gradient(to right, #ccc, #d7dfe1, #ccc);
}
</style>
