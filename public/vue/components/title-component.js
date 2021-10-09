const TitleComponent = {
  data: function() {
    return {
      message: "VN"
    }
  },
  template: `
          <div>
            <slot name="header"></slot>
            <h1>Welcome {{ message }}</h1>
            <p><slot></slot></p>
<!--            <slot text="Hello from child!"></slot>-->
            <button v-on:click="abc">Btn</button>
            <slot name="footer"></slot>
            <slot name="footer"></slot>
          </div>
        `,
  methods: {
    abc: function() {
      this.$emit('event-from-child', this.message)
    }
  }
}

export default TitleComponent