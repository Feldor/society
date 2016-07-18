interface RolesObject {
  addUsersToRoles(users : string|string[], roles : string|string[]) : boolean;
  createRole(roles : string) : void;
  userIsInRole(users : string|string[], roles : string|string[]) : boolean;
}

declare module "meteor/alanning:roles" {
  export let Roles : RolesObject;
}