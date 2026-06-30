import API from "./api";

export const createActivity = async (activity) => {
  try {
    await API.post("/activities", activity);
  } catch (error) {
    console.error("Activity Error:", error);
  }
};