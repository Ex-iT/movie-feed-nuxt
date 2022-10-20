// Modified version of https://css-tricks.com/how-to-animate-the-details-element-using-waapi/

export class Accordion {
  element: HTMLDetailsElement
  summary: HTMLElement | null
  content: HTMLElement | null
  animation: Animation | null
  isClosing: Boolean
  isExpanding: Boolean

  constructor(element: HTMLDetailsElement) {
    // Store the <details> element
    this.element = element
    // Store the <summary> element
    this.summary = element.querySelector('summary')
    // Store the <article> element
    this.content = element.querySelector('article')
    // Store the animation object (so we can cancel it if needed)
    this.animation = null
    // Store if the element is closing
    this.isClosing = false
    // Store if the element is expanding
    this.isExpanding = false
  }

  init() {
    // Detect user clicks on the <details> element
    this.element.addEventListener('click', (event) =>
      this.onClick(event as PointerEvent)
    )
  }

  onClick(event: PointerEvent) {
    // Stop default behaviour from the browser
    event.preventDefault()
    // Add an overflow on the <details> to avoid content overflowing
    this.element.style.overflow = 'hidden'
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.element.open) {
      this.open()
      // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.element.open) {
      this.shrink()
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true

    // Store the current height of the element
    const startHeight = `${this.element.offsetHeight}px`
    // Calculate the height of the summary
    const endHeight = `${this.summary?.offsetHeight || 0}px`

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel()
    }

    // Start a WAAPI animation
    this.animation = this.element.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: 'ease-in-out',
      }
    )

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false)
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => (this.isClosing = false)
  }

  open() {
    // Apply a fixed height on the element
    this.element.style.height = `${this.element.offsetHeight}px`
    // Force the [open] attribute on the details element
    this.element.open = true
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand())
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true
    // Get the current fixed height of the element
    const startHeight = `${this.element.offsetHeight}px`
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${
      (this.summary?.offsetHeight || 0) + (this.content?.offsetHeight || 0)
    }px`

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel()
    }

    // Start a WAAPI animation
    this.animation = this.element.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: 'ease-in-out',
      }
    )
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true)
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => (this.isExpanding = false)
  }

  onAnimationFinish(open: boolean) {
    // Set the open attribute based on the parameter
    this.element.open = open
    // Clear the stored animation
    this.animation = null
    // Reset isClosing & isExpanding
    this.isClosing = false
    this.isExpanding = false
    // Remove the overflow hidden and the fixed height
    this.element.style.height = this.element.style.overflow = ''
  }
}
