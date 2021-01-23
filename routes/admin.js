var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let laptops=[
    {
      name:"Asus ROG Zephyrus Duo 15 Core i7 10th Gen",
      description:"superb,fantastic,marvellous",
      image:"https://rukminim1.flixcart.com/image/416/416/keokpe80/computer/w/e/b/asus-original-imafvah5wwtxd9ct.jpeg?q=70"
    },
    {
      name:"HP G4 Core i7 7th Gen -",
      description:"kozhapula,adjust cheyyam",
      image:"https://rukminim1.flixcart.com/image/416/416/jzd0qkw0/computer/h/n/y/hp-elitebook-1040-laptop-original-imafjebswe9wzyuk.jpeg?q=70"
    },
    {
      name:"Lenovo Legion 7i Core i7 10th Gen ",
      description:"pora poraaa......",
      image:"https://rukminim1.flixcart.com/image/416/416/kdyus280/computer/t/w/3/lenovo-na-gaming-laptop-original-imafuqwpncg3bzhx.jpeg?q=70"
    },
    {
      name:"Apple MacBook Pro Core i9 9th Gen",
      description:"oru rakshem illa machanee..ore poli",
      image:"https://rukminim1.flixcart.com/image/416/416/k7xnukw0/computer/h/3/r/apple-na-laptop-original-imafq2efskbp3pnu.jpeg?q=70"
    },
    {
      name:"Alienware Core i7 10th Gen ",
      description:"adjust cheyyam",
      image:"https://rukminim1.flixcart.com/image/416/416/kf4ajrk0/computer/j/f/u/alienware-original-imafvngmfmgqwawv.jpeg?q=70"
    },
    {
      name:"Acer Core i7 6th Gen",
      description:"gaming mathram kollam",
      image:"https://rukminim1.flixcart.com/image/416/416/computer/k/q/r/acer-predator-notebook-original-imaejmg5gzkf8sth.jpeg?q=70"
    }
  ]
  res.render('admin/view-products',{admin:true,laptops});
});
router.get('/add-products',(req,res)=>{
  res.render('admin/add-products');
});
router.post('/add-products',(req,res)=>{
console.log(req.body);
console.log(req.files.image);
});
module.exports = router;
