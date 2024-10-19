const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issue.controller"); // Adjust the path as needed

// Routes for book issues
router.post("/issue", issueController.issueBook);
router.get("/issuegetall", issueController.getAllIssues);
router.delete("/returnbook/:issueId", issueController.returnBook);

module.exports = router;
