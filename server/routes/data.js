const router = require("express").Router();
const data = require("../models/data");

router.get("/getAll", async (req, res) => {
  const options = {
    sort: { createdAt: 1 },
  };

  const info = await data.find(options);
  if (info) {
    res.status(200).send({ success: true, data: info });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

router.get("/getOne/:getOne", async (req, res) => {
    try {
      const filter = { SrNo : req.params.getOne };
      const info = await data.findOne(filter);
      //console.log(info);
  
      if (info) {
        res.status(200).send({ success: true, data: info });
      } else {
        res.status(404).send({ success: false, msg: "No Data Found" });
      }
    } catch (error) {
      res.status(500).send({ msg: "Internal server error" });
    }
  });

module.exports = router