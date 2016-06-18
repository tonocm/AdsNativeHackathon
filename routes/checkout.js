var express = require('express');
var router = express.Router();
var sendgrid  = require('sendgrid')('SG.rC41nxSISrSVvTY1nZrTzQ.Nn9TsdmaEAecGNxVPCNlZxa0QOGoOPICEucY1IwItGI');
var stripe = require('stripe')('sk_live_8kUO0p7nkC3jvDAHoTDGEIky'); //live
//public key: pk_live_JidocZHC7ZLjK8WzRswBdeke

router.get('/fail', function(req, res, next) {
  res.render('fail', {
    title: "Error: Your card has been declined. Please contact your card issuer or try again.",
    stripeKey: 'pk_live_JidocZHC7ZLjK8WzRswBdeke'
  });
});

router.get('/success', function(req, res, next) {
  res.render('success', {
    title: "Thank You! Your Order Is On Its Way!"
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  var id = req.query.id;
  console.log(id);
  if(id === '1'){
    res.render('checkout', { stripeKey: 'pk_live_JidocZHC7ZLjK8WzRswBdeke', price: '19.99', stripe_price: '1999', name: 'Apple Cider Vinegar', quantity: '100' });
  }
  else if(id === '2'){
    res.render('checkout', { stripeKey: 'pk_live_JidocZHC7ZLjK8WzRswBdeke', price: '99.99', stripe_price: '9999', name: 'Gut Health Infusion', quantity: '100' });
  }
  else if (id === '3'){
    res.render('checkout', { stripeKey: 'pk_live_JidocZHC7ZLjK8WzRswBdeke', price: '99.99', stripe_price: '9999', name: 'All-in-One for Inflammation', quantity: '100'});
  }
  else{
    res.render('index', { title: 'Express' });
  }
});


router.post('/', function(req, res, next) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var add1 = req.body.add1;
  var add2 = req.body.add2;
  var state = req.body.state;
  var zip = req.body.zip;
  var phone = req.body.number;
  var message = req.body.message;
  var stripeToken = req.body.stripeToken;
  var price = req.body.price;

  //console.log(stripeToken);
  //console.log(price);
  var charge = stripe.charges.create({
    amount: price, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "Omega Volts Purchase"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.render('fail', {
        title: "Error: Your card has been declined. Please contact your card issuer or try again.",
        stripeKey: 'pk_live_JidocZHC7ZLjK8WzRswBdeke'
      });
    }
    else {
      var body = "First Name: " + fname + "<br>" + "Last Name: " + lname + "<br>" + "Email: " + email + "<br>" + "Phone: " + phone + "<br>" + "Address Line 1: " + add1 + "<br>" + "Address Line 2: " + add2 + "<br>" + "State: " + state + "<br>" + "Zip Code: " + zip + "<br>" + "Additional Message: " + message;
      sendgrid.send({
        to: 'meckyle@gmail.com',
        //to: 'tonocm94@hotmail.com', // testing
        from: 'purchase@acvworks.com',
        subject: "[ACVWorks] New Purchase Order",
        text: body,
        html: body
      }, function (err, json) {
        if (err) {
          return console.error(err);
        }
        console.log(json);
      });
      res.render('success', {
        title: "Thank You! Your Order Is On Its Way!"
      });
    }
  });
});

module.exports = router;
