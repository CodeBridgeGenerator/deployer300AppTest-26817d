import { isArray } from "lodash";
import client from "../services/restClient";

export const perms = {
  state: {
    profile: {},
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
    setProfile(state, profile) {
      let toReturn = { ...state, profile };
      return toReturn;
    },
    // get Profile

    // has Role
    // has Position
    // has Company
    // has Branch
    // has UserId
    // has Permission
  },
  effects: (dispatch) => ({
    setProfile(_, reduxState) {
      const response = dispatch.cache.getCache();
      console.log("Getting cache results:", response.results);
      this.setProfile(response.results.selectedUser);
    },
    ////////////////////////////////////
    //// GET ALL PERMISSION FIELDS /////
    ////////////////////////////////////
    getPermissionFields(service, reduxState) {
      // client
      //   .service("permissionFields")
      //   .find({
      //     query: {
      //       service: service,
      //     },
      //   })
      //   .then(({ data }) => {
      //     if (data?.length > 0) this.setPermsFields(data);
      //     return data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     return { ...err };
      //   });
    },
    ////////////////////////////////////
    //// GET ALL PERMISSION SERVICES ///
    ////////////////////////////////////
    async getPermissionServices(_, reduxState) {
      client
        .service("permissionServices")
        .find({})
        .then(({ data }) => {
          if (data?.length > 0) this.setPermServices(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
          return { ...err };
        });
    },
    async hasServicePermission(service, reduxState) {
      try {
        const response = await dispatch.cache.get();
        const profileId = response.results.selectedUser;
        const profile = await client.service("profiles").get(profileId);
        console.log("Getting cache results:", response.results.selectedUser);
        console.log("User profile:", profile);
        const adminProfiles = [
          "66e678d947480b243fc573fd",
          "67435a2c6521f76d8ac46f33",
          "685e28c2ae2ec9ded1c8ba8e",
          "67435a2c6521f76d8ac46f32",
        ];
        if (this.permServices?.length === 0) {
          await this.getPermissionServices();
        }
        let permissionService = {
          import: true,
          export: true,
          create: true,
          read: true,
          update: true,
          delete: true,
          seeder: true,
        };
        const permissionServiceData = _.filter(this.permServices, {
          service: service,
        });
        if (Array.isArray(permissionServiceData) && permissionServiceData.length > 0) {
          permissionService = permissionServiceData[0];
        }
        console.log("Permission Service:", permissionServiceData);

        let userHasProfilePermission = false,
          userHasPositionPermission = false,
          userHasRolePermissions = false;
          console.log("position",profile.position,adminProfiles.includes(profile.position))
          console.log("role",profile.role,adminProfiles.includes(profile.role))
        if (
          adminProfiles.includes(profile.position) ||
          adminProfiles.includes(profile.role)
        ) {
          const results = { read : true, ...permissionService }
          console.log("Admin profile detected, granting all permissions:", results);
          return results;
        } else if(Array.isArray(permissionService) && permissionService.length > 0) {
          userHasProfilePermission = permissionService.some(
            (perm) => perm.profile === profile._id
          );
          userHasPositionPermission = permissionService.some(
            (perm) => perm.positionId === profile.position
          );
          userHasRolePermissions = permissionService.some(
            (perm) => perm.roleId === profile.role
          );
        }

        return {
          read: [
            userHasProfilePermission,
            userHasPositionPermission,
            userHasRolePermissions,
          ].some((v) => v === true),
          ...permissionService,
        };
      } catch (err) {
        console.log(err);
        return { ...err };
      }
    },
    async hasServiceFieldsPermission(service, reduxState) {
      // const permissionFields = await this.getPermissionFields(service);
      let userHasFieldPermissions = true;
      // if (
      //   permissionFields
      // ) {
      //     userHasFieldRolePermissions = permissionFields.some(
      //       (perm) => perm.roleId === this.profile.role
      //     );

      return userHasFieldPermissions;
    },
  }),
};
