
module.exports = {
  name: 'PostmanCollection',
  async write () {
    await this.composeWith('./base')
    await this.composeWith('./postman')
  }
}
