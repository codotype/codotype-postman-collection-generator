
module.exports = {
  name: 'PostmanCollectionJSON',
  async write ({ blueprint }) {


    // Defines a new model object
    // TODO - abstract this into @codotype/util (without stringify + escape)
    function buildModelObject (schema) {
      let newModel = {}

      schema.attributes.forEach((attr) => {
        if (attr.datatype === 'STRING_ARRAY') {
          newModel[attr.identifier] = []
        } else if (attr.datatype === 'NUMBER') {
          newModel[attr.identifier] = 0
        } else if (attr.datatype === 'JSON') {
          newModel[attr.identifier] = {}
        } else if (attr.datatype === 'BOOL') {
          newModel[attr.identifier] = attr.default_value || true
        } else if (attr.datatype === 'TEXT') {
          newModel[attr.identifier] = attr.default_value || `${attr.label} Value`
        }
      })

      schema.relations.forEach((rel) => {
         if (rel.type === 'HAS_MANY') {
           newModel[rel.alias.identifier + '_ids'] = []
         } else if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) {
           newModel[rel.alias.identifier + '_id'] = ''
         }
      })

      // Stringifies newModel JSON
      const stringified = JSON.stringify(newModel, null, 2)

      // Returns the escapsed version for the postman_collection.json file
      return stringified.replace(/\n/g, "\\n").replace(/\"/g, '\\"')
    }

    // Compiles the postman-collection template
    await this.copyTemplate(
      this.templatePath('postman-collection.json'),
      this.destinationPath(blueprint.identifier + '.postman_collection.json'),
      { buildModelObject }
    )

  }
}
