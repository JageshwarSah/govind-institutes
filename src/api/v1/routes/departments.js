import Router from 'express'
const router = Router()

import controller from '../controllers/department_controller.js'
router.get('/', controller.get)

export default router
