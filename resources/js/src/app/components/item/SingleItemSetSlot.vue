<template>
  <div v-if="currentVariation">
      <slot :currentVariation="currentVariation"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "single-item-set-slot",

    props: {
        variationId: {
            type: Number,
            required: true
        }
    },

    computed: mapState({
        currentVariation(state) {
            // TODO return state.item.variation;
            return { test: "qq" };
        }
    })
}
</script>
