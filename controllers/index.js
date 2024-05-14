const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// TODO - Create and link additional routes

// router.get("/    ", (req,res)=> {
//     fs.readFile(path.join(__dirname,"     " ),"utf8",(err, data) =>{
//         if (err){console.log ("err")}
   
//         res.json(JSON.parse(data))
//     } )
// })

// router.post("/   ", (req,res) => {
//     console.log(req.body)
//     fs.readFile(path.join(__dirname,"" ),"utf8",(err, data) =>{
//         if (err){console.log ("err")}

//         fs.writeFile(path.join(__dirname,"  "  ), JSON.stringify(notes), (err)=> {
//             if (err){console.log ("err")}
//             res.send(newNote)
//            } )
//         } )
//     })

//     router.delete("/     ", (req,res) => {
//         const noteId = parseInt(req.params.id)
//          fs.readFile(path.join(__dirname,"   " ),"utf8",(err, data) =>{
//              if (err){console.log ("err")}
             

//             fs.writeFile(path.join(__dirname,"   "  ), JSON.stringify(), (err)=> {
//              if (err){console.log ("err")}
//              res.send(  )
//             } )
//          } )
//      })

module.exports = router



router.use('/',homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;