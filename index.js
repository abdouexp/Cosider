//                          read a file.json

const fs = require("fs");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
// jsonReader("./customer.json", (err, customer) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(customer.address); // => "Infinity Loop Drive"
// });

//                          create new file.json

// const fs = require('fs')
// const customer = {
//     name: "Newbie Co.",
//     order_count: 0,
//     address: "Po Box City",
// }
// // const jsonString = JSON.stringify(customer)
// fs.writeFile('./newCustomer.json', JSON.stringify(customer, null, 2), err => {
//     if (err) {
//         console.log('Error writing file', err)
//     } else {
//         console.log('Successfully wrote file')
//     }
// })

//                          update a file.json

jsonReader("./customer.json", (err, customer) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.address = "foufou no9ch";
    fs.writeFile("./customer.json", JSON.stringify(customer, null, 2), err => {
      if (err) console.log("Error writing file:", err);
    });
  });