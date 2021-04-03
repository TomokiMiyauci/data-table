<template>
  <div
    class="it-progress-bar"
    :class="[infinite && 'it-progress-bar--infinite']"
    :style="{ height: `${height}px` }"
  >
    <div
      class="it-progress-line"
      :style="!infinite ? { width: `${progress}%` } : ''"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    infinite: {
      type: Boolean,
      default: true
    },
    progress: {
      type: Number,
      default: 0,
      validator: (val: number) => val >= 0 && val <= 100
    },
    height: { type: Number, default: 3, validator: (val: number) => val > 0 },

    showTooltip: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style>
@keyframes infinite-load {
  0% {
    width: 20%;
    margin-left: -20%;
  }

  100% {
    width: 40%;
    margin-left: 100%;
  }
}

.it-progress-text {
  display: inline-block;
}

.it-progress-bar {
  @apply bg-blue-200;
}

.it-progress-bar--infinite {
  overflow: hidden;

  .it-progress-line {
    animation: infinite-load 1.15s ease-in-out infinite;
  }
}

.it-progress-line {
  @apply bg-blue-500;

  transition: all 0.2s ease-out;
  height: 100%;
  position: relative;
  max-width: 100%;
}
</style>
