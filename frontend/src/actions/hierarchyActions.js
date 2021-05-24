import {
  hierarchyConstants,
  lockDoorConstants,
  unLockDoorConstants,
} from "../constants";
import axiosInstance from "../helpers/axios";
import { exception } from "../Exceptions";
import history from "../helpers/history";
import { useHistory } from "react-router-dom";

export const getAllHierarchy = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: hierarchyConstants.FETCH_ALL_HIERARCHIES_REQUEST });
      const token = window.localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(
        "/hierarchy/getHierarchies",
        config
      );
      if (response.status === 200 || response.status === 201) {
        const { hierarchyList } = response.data;
        dispatch({
          type: hierarchyConstants.FETCH_ALL_HIERARCHIES_SUCCESS,
          payload: { hierarchies: hierarchyList },
        });
      }
    } catch (error) {
      dispatch({
        type: hierarchyConstants.FETCH_ALL_HIERARCHIES_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const getAllLockedDoors = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: lockDoorConstants.FETCH_ALL_LOCKED_DOORS_REQUEST });
      const token = window.localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(
        "/locked-doors/getLockedDoors",
        config
      );
      if (response.status === 200 || response.status === 201) {
        const { lockedDoorsList } = response.data;
        dispatch({
          type: lockDoorConstants.FETCH_ALL_LOCKED_DOORS_SUCCESS,
          payload: { lockedDoors: lockedDoorsList },
        });
      }
    } catch (error) {
      dispatch({
        type: lockDoorConstants.FETCH_ALL_LOCKED_DOORS_FAIL,
        payload: exception(error),
      });
    }
  };
};
export const getAllUnlockedDoors = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: unLockDoorConstants.FETCH_ALL_UNLOCKED_DOORS_REQUEST });
      const token = window.localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(
        "/unlocked-doors/getUnlockedDoors",
        config
      );
      if (response.status === 200 || response.status === 201) {
        const { unLockedDoorsList } = response.data;
        dispatch({
          type: unLockDoorConstants.FETCH_ALL_UNLOCKED_DOORS_SUCCESS,
          payload: { unLockedDoors: unLockedDoorsList },
        });
      }
    } catch (error) {
      dispatch({
        type: unLockDoorConstants.FETCH_ALL_UNLOCKED_DOORS_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const lockDoor = (doorId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: lockDoorConstants.LOCK_DOOR_REQUEST });
      const token = window.localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(
        `/lock-a-door/${doorId}`,
        {},
        config
      );
      if (response.status === 200 || response.status === 201) {
        const { lockedDoor } = response.data;
        dispatch({
          type: lockDoorConstants.LOCK_DOOR_SUCCESS,
          payload: { lockedDoor: lockedDoor },
        });
      }
    } catch (error) {
      dispatch({
        type: lockDoorConstants.LOCK_DOOR_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const unLockDoor = (doorId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: unLockDoorConstants.UNLOCK_DOOR_REQUEST });
      const token = window.localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(
        `/unlock-a-door/${doorId}`,
        {},
        config
      );
      if (response.status === 200 || response.status === 201) {
        const { unLockedDoor } = response.data;
        dispatch({
          type: unLockDoorConstants.UNLOCK_DOOR_SUCCESS,
          payload: { unLockedDoor: unLockedDoor },
        });
      }
    } catch (error) {
      dispatch({
        type: unLockDoorConstants.UNLOCK_DOOR_FAIL,
        payload: exception(error),
      });
    }
  };
};
