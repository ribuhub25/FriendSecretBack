const Couple = require("../models/couple");
const Sort = require("../models/sort");
const uuid = require("uuid");
const { createCouple } = require("./couple");

const getAllSort = async (req, res) => {
  try {
    const sortsAll = await Sort.find({});
    res.json({
      result: "success",
      status: 200,
      data: {
        sorts: sortsAll,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const getSortsByEmailHost = async (req, res) => {
  try {
    const email = req.params.email; // Extract the email from the query parameters
    const sorts = await Sort.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "host",
          foreignField: "_id",
          as: "usuarioHost",
        },
      },
      {
        $unwind: "$usuarioHost",
      },
    ]);
    var results = sorts.filter((s) => s.usuarioHost.email == email);
    // Find users where the email matches the query
    
    if (results.length > 0) {
      res.json({
        result: "success",
        status: 200,
        message: "Se encontraron sorteos",
        data: results,
      });
    } else {
      res.json({
        result: "error",
        status: 500,
        message: "No se encontró sorteos",
        data: [],
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postCreateSort = async (req, res) => {
  try {
    const sort = req.body;
    sort.sid = uuid.v4();
    sort.create_date = Date.now();
    const newSort = await Sort.create(sort);  
    //GENERAR SORTEO
    var couplesArray = generateSort(newSort.list_names,newSort._id);
    try {
      await createCouple(couplesArray);
    } catch (e) {
      console.log(e.message);
    }

    res.json({
        result: "success",
        status: 200,
        message: "Sorteo Creado",
        data: newSort
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateSort = (list_names, sortId) => {
  const list_names_copy = [...list_names];
  const host = list_names_copy[0];

  // Mezclamos aleatoriamente la copia
  list_names_copy.sort(() => Math.random() - 0.5);

  // Creamos las parejas y asignamos un UID
  const parejas = [];
  for (let i = 0; i < list_names_copy.length; i += 2) {
    const pareja = [list_names_copy[i], list_names_copy[i + 1]];
    const codes = [uuid.v4(), uuid.v4()];
    const uid = uuid.v4();// Genera un UUID único
    parejas.push({ uid,pareja, codes, sortId,host });
  }
  return parejas;
}

module.exports = {
  getAllSort,
  postCreateSort,
  getSortsByEmailHost,
};
