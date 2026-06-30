import API from "./api";

export const createActivity = async (activityData) => {
  try {
    const res = await API.post("/activities", activityData);
    return res.data;
  } catch (error) {
    console.error("Activity Error:", error);
  }
};

export const getActivities = async () => {
  try {
    const res = await API.get("/activities");
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};