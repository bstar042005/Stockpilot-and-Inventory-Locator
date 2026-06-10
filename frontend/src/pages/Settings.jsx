import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [fullName, setFullName] = useState("pinsu");
  const [email, setEmail] = useState(
    "payalkanwar4838@gmail.com"
  );

  const saveChanges = () => {
    alert("Settings saved successfully");
  };

  return (
    <div className="settings-page">

      <div className="settings-header">
        <h1>Settings</h1>
        <p>
          Manage your account and preferences
        </p>
      </div>

      <div className="tabs">

        <button className="tab active">
          Profile
        </button>

        <button className="tab">
          Security
        </button>

        <button className="tab">
          Warehouse
        </button>

        <button className="tab">
          Notifications
        </button>

      </div>

      <div className="settings-card">

        <h2>Profile Information</h2>

        <div className="profile-row">

          <div className="avatar">
            P
          </div>

          <div>
            <h3>pinsu</h3>

            <p>
              payalkanwar4838@gmail.com
            </p>

            <span className="role">
              Admin
            </span>
          </div>

        </div>

        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <button
          className="save-btn"
          onClick={saveChanges}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Settings;