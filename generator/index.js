const Generator = require('@codotype/generator')

module.exports = class PostmanCollection extends Generator {
  async write () {
    await this.composeWith('./base')
    await this.composeWith('./postman')
  }
}
