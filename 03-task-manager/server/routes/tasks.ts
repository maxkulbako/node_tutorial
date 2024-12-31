const express = require("express");
const router = express.Router();
import { Request, Response } from "express";

router.route("/").get((req: Request, res: Response) => {
  res.send("All tasks");
});

module.exports = router;
