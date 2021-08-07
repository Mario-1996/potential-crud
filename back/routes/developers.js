const routes = require("express").Router()

const viewController = require("../controllers/viewController")
const createController = require("../controllers/createController")
const updateController = require("../controllers/updateController")
const destroyController = require("../controllers/destroyController")

routes.get('/developers', viewController.view)
routes.get('/developers/:id', viewController.show)
routes.post('/developers', createController.create)
routes.put('/developers/:id', updateController.update)
routes.delete('/developers/:id', destroyController.destroy)

module.exports = routes
