import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import ServicesPage from "./ServicesPage";

const ServiceProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <ServicesPage />
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  hasServicePermission: (service) =>
    dispatch.perms.hasServicePermission(service),
  hasServiceFieldsPermission: (service) =>
    dispatch.perms.hasServiceFieldsPermission(service),
});

export default connect(mapState, mapDispatch)(ServiceProjectLayoutPage);
