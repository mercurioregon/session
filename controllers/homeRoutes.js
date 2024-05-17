const router = require('express').Router();

router.get (`/`,(req, res) =>{
    newProf = req.query.displayName;
    console.log ("HomeRoutes", req.session);
    res.render(`homepage`, {
        newProf,
    });
});

module.exports = router;