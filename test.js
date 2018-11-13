// TODO - this file should be moved into a test directory
const CodotypeRuntime = require('@codotype/runtime')
const buildConfiguration = require('@codotype/util/lib/buildConfiguration')

// const blueprint = require('@codotype/blueprints/lib/team-lists.json')
// const blueprint = require('@codotype/blueprints/lib/textbook-library.json')
const blueprint = require('@codotype/blueprints/lib/todo-list.json')

// Each stage can accept its own app - this is done to simplify challenges introduc
const build = {
  blueprint: blueprint,
  stages: [{
    generator_id: require('./meta').id,
    configuration: buildConfiguration({ blueprint: blueprint, generator: require('./meta') })
  }]
}

// Invoke runtime directly with parameters
const runtime = new CodotypeRuntime()

// Registers this generator via relative path
runtime.registerGenerator({ relative_path: './' })

// Executes the build
runtime.execute({ build })
  .then(() => {
    console.log('TEST SUCCESSFUL')
  })
