import API from "./api";

export const createActivity = async (activityData) => {
  try {
    const res = await API.post("/activity", activityData);
    return res.data;
  } catch (error) {
    console.error("Activity Error:", error);
  }
};

export const getActivities = async () => {
  try {
    const res = await API.get("/activity");
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};