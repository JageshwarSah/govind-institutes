const { Router } = require('express')

import admin from '../controllers/admin_controller.js'
Router.get('/', admin.get)

export default Router
