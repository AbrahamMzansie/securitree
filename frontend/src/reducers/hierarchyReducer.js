import {
  hierarchyConstants,
  lockDoorConstants,
  unLockDoorConstants,
} from "../constants";
const INITIALSTATE = {
  error: null,
  message: null,
  loading: false,
  hierarchies: [],
  lockedDoors: [],
  unLockedDoors: [],
  lockedDoor: {},
  unLockedDoor : {},
};

export const hierarchyReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case hierarchyConstants.FETCH_ALL_HIERARCHIES_REQUEST:
      return (state = {
        ...state,
        error: null,
        message: null,
        loading: true,
        hierarchies: null,
      });
    case hierarchyConstants.FETCH_ALL_HIERARCHIES_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        hierarchies: action.payload.hierarchies,
      });

    case hierarchyConstants.FETCH_ALL_HIERARCHIES_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    case lockDoorConstants.FETCH_ALL_LOCKED_DOORS_REQUEST:
      return (state = {
        ...state,
        error: null,
        message: null,
        loading: true,
        lockedDoors: null,
      });
    case lockDoorConstants.FETCH_ALL_LOCKED_DOORS_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        lockedDoors: action.payload.lockedDoors,
      });

    case lockDoorConstants.FETCH_ALL_LOCKED_DOORS_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    case lockDoorConstants.LOCK_DOOR_REQUEST:
      return (state = {
        ...state,
        error: null,
        message: null,
        loading: true,
        lockedDoor: {},
      });
    case lockDoorConstants.LOCK_DOOR_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        lockedDoor: action.payload.lockedDoor,
        unLockedDoors: state.unLockedDoors.filter(
          (door) => door.id !== action.payload.lockedDoor.id
        ),
      });

    case lockDoorConstants.LOCK_DOOR_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    case unLockDoorConstants.UNLOCK_DOOR_REQUEST:
      return (state = {
        ...state,
        error: null,
        message: null,
        loading: true,
        unLockedDoor: {},
      });
    case unLockDoorConstants.UNLOCK_DOOR_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        unLockedDoor: action.payload.unLockedDoor,
        lockedDoors: state.lockedDoors.filter(
          (door) => door.id !== action.payload.unLockedDoor.id
        ),
      });

    case unLockDoorConstants.UNLOCK_DOOR_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    case unLockDoorConstants.FETCH_ALL_UNLOCKED_DOORS_REQUEST:
      return (state = {
        ...state,
        error: null,
        message: null,
        loading: true,
        unLockedDoors: null,
      });
    case unLockDoorConstants.FETCH_ALL_UNLOCKED_DOORS_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        unLockedDoors: action.payload.unLockedDoors,
      });

    case unLockDoorConstants.FETCH_ALL_UNLOCKED_DOORS_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    default:
      return state;
  }
};
