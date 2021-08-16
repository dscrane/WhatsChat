import React, { useState } from "react";
import { connect } from "react-redux";
import { ProfileCard } from "../ProfileCard";
import { ConfirmationModal } from "../ConfirmationModal";
import {
  logout,
  updateUser,
  deleteUser,
} from "../../redux/actions/authActions";
import "./sidebarProfile.css";

const SidebarProfile = ({ auth, logout, updateUser, deleteUser }) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const deleteAccountModalConfig = {
    title: "Delete Account",
    message: "Are you sure you want to delete your account?",
    btnText: "Delete",
    btnStyle: "danger",
  };

  const handleDelete = () => {
    deleteUser();
  };

  const profileDisplay = auth.isLoggedIn ? (
    <ProfileCard
      auth={auth}
      updateUser={updateUser}
      logout={logout}
      setModalDisplay={setModalDisplay}
    />
  ) : (
    <div className="text-white">Log in to see your profile</div>
  );

  return (
    <div className="sidebar__profile">
      {profileDisplay}
      <ConfirmationModal
        modalConfig={deleteAccountModalConfig}
        setModalDisplay={setModalDisplay}
        modalDisplay={modalDisplay}
        fnHandler={handleDelete}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout, updateUser, deleteUser })(
  SidebarProfile
);
