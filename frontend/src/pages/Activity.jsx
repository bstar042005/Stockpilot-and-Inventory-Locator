import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getActivities } from "../services/activityApi";
import "./Activity.css";

function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

const loadActivities = async () => {
  const data = await getActivities();

  console.log("Activities:", data);

  setActivities(data);
};

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <div className="analytics-page">

          <div className="analytics-header">
            <h1>Activity Timeline</h1>
            <p>Recent warehouse activities</p>
          </div>

          <table className="analytics-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Product</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>
                    {new Date(activity.createdAt).toLocaleString("en-IN")}
                  </td>

                  <td>{activity.user}</td>

                  <td>{activity.role}</td>

                  <td>{activity.action}</td>

                  <td>{activity.productName || "-"}</td>

                  <td>{activity.details}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Activity;