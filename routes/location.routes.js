const router = require('express-promise-router')();
const locationController = require('../controllers/location.controller');

router.route('/addOutletLocation')
    .post((locationController.addOutletLocation));


router.route('/FindNearestOutlet')
    .post((locationController.FindNearestOutlet));




module.exports = router;    
