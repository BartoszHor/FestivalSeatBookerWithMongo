const express = require('express');
const router = express.Router();



const TestimonialController = require('../controllers/testimonials.controller')

router.route('/testimonials/random').get(TestimonialController.getRandom)

router.route('/testimonials').get(TestimonialController.getAll)

router.route('/testimonials/:id').get(TestimonialController.getTestimonialById)

router.route('/testimonials').post(TestimonialController.postNewTestimonial)    

router.route('/testimonials/:id').put(TestimonialController.changeTestimonialData)

router.route('/testimonials/:id').delete(TestimonialController.deleteTestimonialData)

module.exports = router;