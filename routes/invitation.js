const express  = require('express');
const router = express.Router();
const Invitation  = require('./../controllers/invitationController.js')
const inviteValidation = require('./../validators/invitation.js')

router.use(express.urlencoded({ extended:true }))

router.post('/send', Invitation.send);
router.get('/accept', Invitation.accept);
router.post('/register', inviteValidation, Invitation.register);

module.exports = router
