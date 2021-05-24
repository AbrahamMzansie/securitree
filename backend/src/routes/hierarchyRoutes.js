const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/requireSignIn");
const hierarchyController = require("../controllers/hierarchyController");

router.post(
  "/hierarchy/create",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  hierarchyController.createHierarchy
);

router.get(
  "/hierarchy/getHierarchies",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  hierarchyController.retriveHierarchies
);
router.get(
  "/locked-doors/getLockedDoors",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  hierarchyController.retriveAllLockedDoors,
);

router.get(
  "/unlocked-doors/getUnlockedDoors",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  hierarchyController.retriveAllUnlockedDoors,
);
router.post(
  "/lock-a-door/:doorId",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  hierarchyController.updateUnlockedDoor,
);

router.post(
  "/unlock-a-door/:doorId",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  hierarchyController.updateLockedDoor,
);

module.exports = router;
