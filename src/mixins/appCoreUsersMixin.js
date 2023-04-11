import { UserService } from '@/services';

export default {
   methods: {
      async appCoreUsersMixinFetch(
         objectToAddUsersTo,
         userIdentifierParameter
      ) {
         const allUserIds = this.appCoreUsersMixinCreateUserIdArrays(
            objectToAddUsersTo,
            userIdentifierParameter
         );
         const uniqueUserIds = allUserIds.filter(function (item, pos) {
            return allUserIds.indexOf(item) === pos;
         });
         const users = await this.appCoreUsersMixinFetchDetails(uniqueUserIds);

         return this.appCoreUsersMixinAddUserToArray(
            objectToAddUsersTo,
            userIdentifierParameter,
            users
         );
      },
      appCoreUsersMixinCreateUserIdArrays(
         objectToExtractIds,
         identifierParam,
         results = []
      ) {
         const r = results;
         Object.keys(objectToExtractIds || {}).forEach((key) => {
            const value = objectToExtractIds[key];
            if (key === identifierParam && typeof value !== 'object') {
               r.push(value);
            } else if (typeof value === 'object') {
               this.appCoreUsersMixinCreateUserIdArrays(
                  value,
                  identifierParam,
                  r
               );
            }
         });
         return r;
      },
      appCoreUsersMixinAddUserToArray(
         objectToAddUserTo,
         identifierParam,
         usersList,
         results = []
      ) {
         const r = results;
         Object.keys(objectToAddUserTo || {}).forEach((key) => {
            const value = objectToAddUserTo[key];
            if (key === identifierParam && typeof value !== 'object') {
               objectToAddUserTo['user'] = usersList.filter(
                  (i) => i.id === value
               )[0];
               r.push(objectToAddUserTo);
            } else if (typeof value === 'object') {
               this.appCoreUsersMixinAddUserToArray(
                  value,
                  identifierParam,
                  usersList,
                  r
               );
            }
         });
         return r;
      },
      async appCoreUsersMixinFetchDetails(userIds) {
         const results = await UserService.fetchUserDetailsFromAppCore(userIds);
         if (results !== null) {
            return results;
         }
         return [];
      },
   },
};
