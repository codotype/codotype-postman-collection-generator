const Generator = require('@codotype/generator')

// // // //

module.exports = class PostmanCollectionJson extends Generator {
  async write ({ blueprint }) {

    // Copies models
    await this.copyTemplate(
      this.templatePath('postman-collection.json'),
      this.destinationPath(blueprint.identifier + '.postman_collection.json')
    )

  }
}
