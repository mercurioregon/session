const router = require('express').Router();
const { User } = require('../models');
// var ACCESSTOKEN = ""

// ACCESSTOKEN = access_token


router.get (`/`, async (req, res) =>{
  let newProf = req.query.displayName;
  const userData = await User.findOne({ where: { display_name: newProf} });
  const currentUser = userData.get({ plain: true });

  console.log ("HomeRoutes", req.session);
  res.render(`homepage`, {
      newProf,
      currentUser,
  });
});

// router.get (`/profile`, async (req, res) =>{
//   try {
//     const userData = await User.findOne({ where: { display_name: req.query.display_name} });

//     const currentUser = userData.map((user) => user.get({ plain: true }));

//     res.render(`profile`, {
//       ...currentUser,
//   });
//   } catch (err) {
//   res.status(404).json(err);
//   }
// });


module.exports = router;
