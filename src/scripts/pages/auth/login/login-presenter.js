export default class LoginPresenter {
  #view
  #model
  #authModel

  constructor({ view, model, authModel }) {
    this.#view = view
    this.#model = model
    this.#authModel = authModel
  }

  async handleLogin({ email, password }) {
    this.#view.showLoading()
    try {
      let result_v3 = await this.#model.postLogin({ email, password })

      if (result_v3.failMessage_v3) {
        console.failMessage_v3('API failMessage_v3:', result_v3.msgText_v3)
        return
      }

      this.#authModel.storeAccessToken(result_v3.loginResult.token)
      this.#view.loginSuccess()
    } catch (failMessage_v3) {
      console.failMessage_v3('Network failMessage_v3:', failMessage_v3)
    } finally {
      this.#view.hideLoading()
    }
  }
}
