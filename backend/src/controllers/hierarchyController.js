const Hierarchy = require("../models/hierarchyModel");
const Door = require("../models/doorModel");
const AccessRule = require("../models/accessRuleModel");

//create new hierarchy
const createHierarchy = (req, res) => {
  const systemData = req.body.system_data.areas;
  systemData.map((data) => {
    const hierarchyObj = {
      id: data.id,
      name: data.name,
      parent_area_id: data.parent_area_id,
      parent_area: data.parent_area,
      child_area_ids: data.child_area_ids
        ? data.child_area_ids.map((ids) => {
            return { id: ids };
          })
        : {},
    };
    const hierarchyData = new Hierarchy(hierarchyObj);
    hierarchyData.save((error, hierarchy) => {
      if (error) {
        console.log(error);
      }
      if (hierarchy) {
        //  console.log(hierarchy);
      }
    });
  });

  const doorsDataList = req.body.system_data.doors;
  doorsDataList.map((item) => {
    const doorObj = {
      id: item.id,
      name: item.name,
      parent_area: item.parent_area,
      status: item.status,
    };
    const doorData = new Door(doorObj);
    doorData.save((error, door) => {
      if (error) {
        console.log(error);
      }
      if (door) {
        //  console.log(door);
      }
    });
  });

  const accessRuleDataList = req.body.system_data.access_rules;
  accessRuleDataList.map((item) => {
    const accessRuleObj = {
      id: item.id,
      name: item.name,
      doors: item.doors
        ? item.doors.map((ids) => {
            return { id: ids };
          })
        : {},
    };
    const accessRuleData = new AccessRule(accessRuleObj);
    accessRuleData.save((error, accessRule) => {
      if (error) {
        console.log(error);
      }
      if (accessRule) {
        //  console.log(accessRule);
      }
    });
  });

  return res.status(200).json({ message: "Action was successful" });
};

const retriveDoors = (doors, parent_area) => {
  let doorDescription = null;
  let doorStatus = null;
  let relatedDoorList = [];
  for (let door of doors) {
    if (parent_area == door.parent_area) {
      doorStatus = door.status == "open" ? "(UNLOCKED)" : "(LOCKED)";
      if (doorDescription) {
        doorDescription = `${doorDescription} ${door.name} ${doorStatus},`;
      } else {
        doorDescription = `${door.name} ${doorStatus},`;
      }
      relatedDoorList.push({
        _id: door._id,
        id: door.id,
        name: door.name,
        parent_area: door.parent_area,
      });
    }
  }
  let doorList = `[Door] ${doorDescription}`;
  doorList = doorList.slice(0, -1);

  return { relatedDoorList, doorList };
};
const retriveAccessRules = (doors, accessRules) => {
  let rulesList = [];
  let allAccessRulesList = null;
  for (let relatedDoor of doors) {
    for (let rule of accessRules) {
      for (let door of rule.doors) {
        if (door.id === relatedDoor.id) {
          rulesList.push({
            _id: rule._id,
            id: rule.id,
            name: rule.name,
          });
        }
      }
    }
  }

  const uniqueAccessRules = [
    ...new Map(rulesList.map((item) => [item.id, item])).values(),
  ];
  uniqueAccessRules.map((rule) => {
    if (allAccessRulesList) {
      allAccessRulesList = `${allAccessRulesList} ${rule.name},`;
    } else {
      allAccessRulesList = ` ${rule.name},`;
    }
  });
  let accessRulesList = `[Access Rules] ${allAccessRulesList}`;
  accessRulesList = accessRulesList.slice(0, -1);
  return { uniqueAccessRules, accessRulesList };
};

const createHierarchies = (
  hierarchies,
  doors,
  accessRules,
  parentId = null
) => {
  const hierarchList = [];
  let hierarchy = null;
  if (parentId == null) {
    hierarchy = hierarchies.filter((cat) => cat.parent_area === undefined);
  } else {
    hierarchy = hierarchies.filter((cat) => cat.parent_area == parentId);
  }
  for (let cate of hierarchy) {
    let relatedDoors = retriveDoors(doors, cate.id);
    let newHierarchy = {
      _id: cate._id,
      id: cate.id,
      name: cate.name.toUpperCase(),
      parent_area: cate.parent_area,
      doors: relatedDoors,
      accessRules: retriveAccessRules(
        relatedDoors.relatedDoorList,
        accessRules
      ),
      children: createHierarchies(hierarchies, doors, accessRules, cate.id),
    };
    hierarchList.push({
      ...newHierarchy,
      children: [
        { name: newHierarchy.doors.doorList },
        {
          name: newHierarchy.accessRules.accessRulesList,
        },
        ...newHierarchy.children,
      ],
    });
  }
  return hierarchList;
};

const retriveHierarchies = async (req, res) => {
  const hierarchies = await Hierarchy.find({}).exec();
  const doors = await Door.find({}).exec();
  const accessRules = await AccessRule.find({}).exec();
  if (hierarchies) {
    const hierarchyList = createHierarchies(hierarchies, doors, accessRules);
    return res.status(200).json({ hierarchyList });
  }
};
const retriveAllLockedDoors = async (req, res) => {
  const lockedDoorsList = await Door.find({ status: "closed" }).exec();
  if (lockedDoorsList) {
    return res.status(200).json({ lockedDoorsList });
  }
};
//                                                         V--- THIS WAS ADDED

const retriveAllUnlockedDoors = async (req, res) => {
  const unLockedDoorsList = await Door.find({ status: "open" }).exec();
  if (unLockedDoorsList) {
    return res.status(200).json({ unLockedDoorsList });
  }
};

const updateUnlockedDoor = async (req, res) => {
  Door.findOneAndUpdate(
    { id: req.params.doorId },
    { $set: { status: "closed" } },
    { new: true },
    (error, lockedDoor) => {
      if (error) return res.status(400).json({ error });
      if (lockedDoor) {
        return res.status(200).json({ lockedDoor });
      } else {
        return res.status(400).json({ message: "Door not found" });
      }
    }
  );
};

const updateLockedDoor = async (req, res) => {
  Door.findOneAndUpdate(
    { id: req.params.doorId },
    { $set: { status: "open" } },
    { new: true },
    (error, unLockedDoor) => {
      if (error) return res.status(400).json({ error });
      if (unLockedDoor) {
        return res.status(200).json({ unLockedDoor });
      } else {
        return res.status(400).json({ message: "Door not found" });
      }
    }
  );
};

module.exports = {
  createHierarchy,
  retriveHierarchies,
  retriveAllLockedDoors,
  retriveAllUnlockedDoors,
  updateUnlockedDoor,
  updateLockedDoor,
};
