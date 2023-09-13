const { createStaff, viewStaff, deleteStaff, updateStaff, getAllStaff } = 
require ('../Controllers/ClassController');

const router = require("express").Router();

router.post("/create", createStaff);
router.get("/:StaffID", viewStaff);
router.get("/", getAllStaff);
router.delete("/delete/:StaffID", deleteStaff);
router.put("/update/:StaffID", updateStaff);

module.exports = router;