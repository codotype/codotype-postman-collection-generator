
module.exports = {
  name: 'PostmanCollectionBase',
  async write () {
    await this.copyDir(
      this.templatePath(),
      this.destinationPath()
    )
  }
}

