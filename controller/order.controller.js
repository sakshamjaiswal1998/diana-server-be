const config = require("../config/auth.config");
const Order = require("../models/Order");
const User = require("../models/User");

exports.place = async (req, res) => {
  console.log('Place order here', req.body);
  Order.count({}, (err, count) => {
    if(err) {
      res.status(500).json({ message: 'Could not place order', status: 500 });
    }
    console.log('err, count', err, count);

    try {
      
      const order = new Order({
        order_id: count+1,
        username: req.body.username,
        order_subtotal: req.body.order_subtotal,
        shipping: req.body.shipping,
        taxes: req.body.taxes,
        order_total: req.body.order_total,
        payment_method: req.body.payment_method,
        transaction_id: req.body.transaction_id,
        cart: req.body.cart, // Replace with Cart Object _id later
      });



      order.save((err, order) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        res.status(200).json({ 
          message: "User was registered successfully!", 
          status: 200 });
      });
    } catch (error) {
      console.log('*Order ERR*', error);
      res.status(500).json({ message: 'Could not place order', status: 500 });
    }
  });
  



  // user.save((err, user) => {
  //   if (err) {
  //     res.status(500).json({ message: err });
  //     return;
  //   }
  //   if (req.body.roles) {
  //       let temp = JSON.parse(req.body.roles);
  //       if (temp) {
  //           Role.find(
  //               {
  //               name: { $in: temp }
  //               },
  //               (err, roles) => {
  //               if (err) {
  //                   res.status(500).json({ message: err });
  //                   return;
  //               }

  //               user.roles = roles.map(role => role._id);
  //               user.save(err => {
  //                   if (err) {
  //                   res.status(500).json({ message: err });
  //                   return;
  //                   }

  //                   res.status(200).json({ 
  //                       message: "User was registered successfully!", 
  //                       status: 200 });
  //               });
  //               }
  //           );
  //       }
  //       else {
  //           console.log('non role / default');
  //           Role.findOne({ name: "user" }, (err, role) => {
  //               if (err) {
  //               res.status(500).json({ message: err });
  //               return;
  //               }

  //               user.roles = [role._id];
  //               user.save(err => {
  //               if (err) {
  //                   res.status(500).json({ message: err });
  //                   return;
  //               }

  //               res.status(200).json({ 
  //                   message: "User was registered successfully!", 
  //                   status: 200 });
  //               });
  //           });
  //       }
  //   }
  //   else {
  //       console.log('non role args');
  //       Role.findOne({ name: "user" }, (err, role) => {
  //           if (err) {
  //           res.status(500).json({ message: err });
  //           return;
  //           }

  //           user.roles = [role._id];
  //           user.save(err => {
  //           if (err) {
  //               res.status(500).json({ message: err });
  //               return;
  //           }

  //           res.status(200).json({ 
  //               message: "User was registered successfully!", 
  //               status: 200 });
  //           });
  //       });

  //   }
  // });
};
