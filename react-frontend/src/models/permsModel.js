import client from "../services/restClient";

export const perms = {
  state: {
    permFields: [],
    permServices: [],
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    setPermsFields(state, permFields) {
      let toReturn = { ...state, permFields };
      return toReturn;
    },
    setPermServices(state, permServices) {
      let toReturn = { ...state, permServices };
      return toReturn;
    },
    // has Profile
    // has Role
    // has Position
    // has Company
    // has Branch
    // has UserId
    // has Permission
  },
  effects: (dispatch) => ({
    ////////////////////////////////////
    //// GET ALL PERMISSION FIELDS /////
    ////////////////////////////////////
    async getPermissionFields(_, reduxState) {
      const { data } = await client.service("permissionFields").find({});
      if (data?.length > 0) this.setPermsFields(data);
    },
    ////////////////////////////////////
    //// GET ALL PERMISSION SERVICES ///
    ////////////////////////////////////
    async getPermissionServices(_, reduxState) {
      const { data } = await client.service("permissionServices").find({});
      if (data?.length > 0) this.setPermServices(data);
    },
  }),
};
