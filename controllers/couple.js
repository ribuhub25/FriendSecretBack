const Couple = require("../models/couple");

// const createCouple = (req) => {
//     const sid = "";
//     const code_user_1 = "";
//     const name_1 = "";
//     const code_user_2 = "";
//     const name_2 = "";
//     const sort_id = "";
//     const coupleList = [];
//     try {
//       req.forEach((el) => {
//       sid = el.uid;
//       code_user_1 = el.codes[0];
//       name_1 = el.pareja[0];
//       code_user_2 = el.codes[1];
//       name_2 = el.pareja[1];
//       sort_id = el.sortId;
//       coupleList = [];
//       coupleList.push({
//           "sid": sid,
//           "code_user_1": code_user_1,
//           "code_user_2": code_user_2,
//           "name_1": name_1,
//           "name_2": name_2,
//           "sort_id": sort_id
//       })
//       console.log(coupleList);
//       Couple.create(coupleList);
//       });
//     return
//   } catch (e) {
//     console.log(e);
//   }
// };

const createCouple = (req) => {
  // Initialize an empty array to store couples
  const coupleList = [];

  try {
    // Loop through each element in the request array
    req.forEach((el) => {
      const newCouple = {
        sid: el.uid,
        user_1: {
          code: el.codes[0],
          name: el.pareja[0],
          friendSecret: el.codes[1],
        },
        user_2: {
          code: el.codes[1],
          name: el.pareja[1],
          friendSecret: el.codes[0],
        },
        sort_id: el.sortId,
        host: el.host
      };

      // Add the new couple object to the coupleList array
      coupleList.push(newCouple);
    });

    // Create all couples at once using bulk create (assuming Couple is a Mongoose model)
    return Couple.create(coupleList);
  } catch (e) {
    console.error("Error creating couples:", e);
    // You can also throw the error for further handling if needed
  }
};

const getFriendSecret = async (req, res) => {
  try {
    const code = req.params.code;
    const couples = await Couple.aggregate([
      {
        $lookup: {
          from: "sorts",
          localField: "sort_id",
          foreignField: "_id",
          as: "sortCouple",
        },
      },
      {
        $unwind: "$sortCouple",
      },
    ]);
    await filterByCode1(code).then((results) => {     
      try {
        if (results.length > 0) {
          res.json({
            result: "success",
            message: "SE ENCONTRÓ UN CODIGO",
            data: {
              code: results[0].user_2.code,
              name: results[0].user_2.name,
              wishlist: results[0].wishlist_id_2,
            },
          });
        }
        
      } catch (e) {}
    });
    await filterByCode2(code).then((results) => {
      try {
        if (results.length > 0) {
          res.json({
            result: "success",
            data: {
              code: results[0].user_1.code,
              name: results[0].user_1.name,
              wishlist: results[0].wishlist_id_1,
            },
          });
        }
      } catch (e) {}
    });
   
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInfoCode = async (req, res) => {
  try {
    const code = req.params.code;
    const couples = await Couple.aggregate([
      {
        $lookup: {
          from: "sorts",
          localField: "sort_id",
          foreignField: "_id",
          as: "sortCouple",
        },
      },
      {
        $unwind: "$sortCouple",
      },
    ]);
    await filterByCode1(code).then((results) => {
      try {
        if (results.length > 0) {
          res.json({
            result: "success",
            message: "SE ENCONTRÓ UN CODIGO",
            data: {
              code: results[0].user_1.code,
              name: results[0].user_1.name,
              wishlist: results[0].wishlist_id_1,
            },
          });
        }
      } catch (e) {}
    });
    await filterByCode2(code).then((results) => {
      try {
        if (results.length > 0) {
          res.json({
            result: "success",
            data: {
              code: results[0].user_2.code,
              name: results[0].user_2.name,
              wishlist: results[0].wishlist_id_2,
            },
          });
        }
      } catch (e) {}
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCodes = async (req, res) => {
  try {
    
    const sort = req.params.sort;
    const couples = await Couple.aggregate([
      {
        $lookup: {
          from: "sorts",
          localField: "sort_id",
          foreignField: "_id",
          as: "sortCouple",
        },
      },
      {
        $unwind: "$sortCouple",
      },
    ]);
    const couplesArray = [];
    couples.forEach(element => {
      if (element.sortCouple.sid == sort) {
        couplesArray.push({
          name: element.user_1.name,
          friendSecret: element.user_1.friendSecret,
          host: element.host == element.user_1.name ? true : false,
        });
        couplesArray.push({
          name: element.user_2.name,
          friendSecret: element.user_2.friendSecret,
          host: element.host == element.user_2.name ? true : false,
        });
      }
    });
    res.json({
      data: couplesArray,
    });
  }catch(e){}
}

const filterByCode1 = async (code) => {
  try {
    const couples = await Couple.find({ 'user_1.code': code });
    return couples;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const filterByCode2 = async (code) => {
  try {
    const couples = await Couple.find({ "user_2.code": code });
    return couples;
  } catch (error) {
    console.error(error);
    return [];
  }
};


module.exports = {
  createCouple,
  getFriendSecret,
  getAllCodes,
  getInfoCode,
};
