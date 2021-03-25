import Router from 'express'
const router = Router()

import controller from '../controllers/course_controller.js'

router.get('/', controller.get)
router.post('/', controller.post)

export default router
