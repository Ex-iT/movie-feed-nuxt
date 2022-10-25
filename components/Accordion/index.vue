<template>
  <details ref="details" @click="handleClick">
    <AccordionSummary :ref="summaryRef" class="summary">
      <slot name="summary"></slot>
    </AccordionSummary>
    <AccordionContent :ref="contentRef" class="content">
      <slot name="content"></slot>
    </AccordionContent>
  </details>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AccordionComponent',
  data(): {
    accordionEl: HTMLDetailsElement | undefined
    summaryEl: HTMLDivElement | undefined
    contentEl: HTMLDivElement | undefined
    animation: Animation | null
    isClosing: Boolean
    isExpanding: Boolean
    closedHeight: string
  } {
    return {
      accordionEl: undefined,
      summaryEl: undefined,
      contentEl: undefined,
      animation: null,
      isClosing: false,
      isExpanding: false,
      closedHeight: '0px',
    }
  },
  mounted() {
    this.accordionEl = this.$refs.details as HTMLDetailsElement
    this.closedHeight = `${this.accordionEl.offsetHeight}px`
  },
  methods: {
    summaryRef(summaryElement: Vue<Element>) {
      this.summaryEl = summaryElement.$el as HTMLDivElement
    },
    contentRef(contentElement: Vue<Element>) {
      this.contentEl = contentElement.$el as HTMLDivElement
    },
    handleClick(event: MouseEvent) {
      // Modified version of https://css-tricks.com/how-to-animate-the-details-element-using-waapi/
      event.preventDefault()

      if (this.accordionEl) {
        this.accordionEl.style.overflow = 'hidden'

        if (this.isClosing || !this.accordionEl.open) {
          this.open()
        } else if (this.isExpanding || this.accordionEl.open) {
          this.shrink()
        }
      }
    },
    open() {
      if (this.accordionEl) {
        this.accordionEl.style.height = `${this.accordionEl.offsetHeight}px`
        this.closedHeight = `${this.accordionEl.offsetHeight}px`
        this.accordionEl.open = true

        window.requestAnimationFrame(() => this.expand())
      }
    },
    expand() {
      if (this.accordionEl) {
        this.isExpanding = true
        const endHeight = `${
          (this.summaryEl?.offsetHeight || 0) +
          (this.contentEl?.offsetHeight || 0)
        }px`

        if (this.animation) {
          this.animation.cancel()
        }

        this.animation = this.accordionEl.animate(
          {
            height: [this.closedHeight, endHeight],
          },
          {
            duration: 300,
            easing: 'ease-in-out',
          }
        )
        this.animation.onfinish = () => this.onAnimationFinish(true)
        this.animation.oncancel = () => (this.isExpanding = false)
      }
    },
    shrink() {
      if (this.accordionEl) {
        this.isClosing = true
        const startHeight = `${this.accordionEl.offsetHeight}px`

        if (this.animation) {
          this.animation.cancel()
        }

        this.animation = this.accordionEl.animate(
          {
            height: [startHeight, this.closedHeight],
          },
          {
            duration: 300,
            easing: 'ease-in-out',
          }
        )

        this.animation.onfinish = () => this.onAnimationFinish(false)
        this.animation.oncancel = () => (this.isClosing = false)
      }
    },
    onAnimationFinish(open: boolean) {
      if (this.accordionEl) {
        this.accordionEl.open = open
        this.animation = null
        this.isClosing = false
        this.isExpanding = false
        this.accordionEl.style.height = this.accordionEl.style.overflow = ''
      }
    },
  },
})
</script>

<style scoped>
details {
  position: relative;
  display: flex;
  column-gap: var(--spacing-medium);
  padding: var(--spacing-medium);
}

.summary {
  position: relative;
  display: flex;
  column-gap: var(--spacing-medium);
  padding-right: var(--spacing-medium);
  list-style: none;
}

.content {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-medium);
  padding-top: var(--spacing-medium);
  padding-right: var(--spacing-medium);
  margin-left: calc(40px + var(--spacing-medium));
}
</style>
