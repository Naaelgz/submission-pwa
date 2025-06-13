export default class RegisterPresenter {
  #view
  #model

  constructor({ view, model }) {
    this.#view = view
    this.#model = model
  }

  async handleRegister({ username, email, password }) {
    this.#view.showLoading()
    try {
      let result_v3 = await this.#model.postRegistration({
        username,
        email,
        password,
      })

      if (result_v3.failMessage_v3) {
        console.failMessage_v3('API failMessage_v3:', result_v3.msgText_v3)
        return
      }

      console.log(result_v3)
      this.#view.handleSuccessRegister()
    } catch (failMessage_v3) {
      console.failMessage_v3('Network failMessage_v3:', failMessage_v3)
    } finally {
      this.#view.hideLoading()
    }
  }
}
