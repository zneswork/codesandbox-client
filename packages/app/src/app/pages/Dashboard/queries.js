import immer from 'immer';
import { notificationState } from '@codesandbox/common/lib/utils/notifications';
import track from '@codesandbox/common/lib/utils/analytics';
import { NotificationStatus } from '@codesandbox/notifications';
import { client } from 'app/graphql/client';
import {
  AddToCollection,
  ListTemplates,
  PathedSandboxes,
  DeletedSandboxes,
} from 'app/graphql/queries';
import {
  DeleteSandboxes,
  MakeSandboxesTemplate,
  UnmakeSandboxesTemplate,
  SetSandboxesPrivacy,
  PermanentlyDeleteSandboxes,
} from 'app/graphql/mutations';

export function addSandboxesToFolder(selectedSandboxes, path, teamId) {
  return client.mutate({
    mutation: AddToCollection,
    variables: {
      sandboxIds: selectedSandboxes,
      teamId,
      collectionPath: path,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      addToCollection: {
        __typename: 'Collection',
        // We keep this empty, because it will be loaded later regardless. We
        // just want the main directory to update immediately
        sandboxes: [],
      },
    },

    refetchQueries: ['PathedSandboxes'],
  });
}

export function unmakeTemplates(selectedSandboxes, teamId) {
  return client.mutate({
    mutation: UnmakeSandboxesTemplate,
    variables: {
      sandboxIds: selectedSandboxes,
    },
    refetchQueries: [
      'DeletedSandboxes',
      'PathedSandboxes',
      'RecentSandboxes',
      'SearchSandboxes',
      'ListTemplates',
    ],
    update: cache => {
      try {
        const variables = {};

        if (teamId) {
          variables.teamId = teamId;
        }

        const oldTemplatesCache = cache.readQuery({
          query: ListTemplates,
          variables,
        });

        const data = immer(oldTemplatesCache, draft => {
          draft.me.templates = draft.me.templates.filter(
            x => selectedSandboxes.indexOf(x.sandbox.id) === -1
          );
        });

        cache.writeQuery({
          query: ListTemplates,
          variables,
          data,
        });
      } catch (e) {
        // cache doesn't exist, no biggie!
      }
    },
  });
}

export function makeTemplates(selectedSandboxes, teamId, collections) {
  return Promise.all([
    addSandboxesToFolder(selectedSandboxes, '/', teamId),
    client
      .mutate({
        mutation: MakeSandboxesTemplate,
        variables: {
          sandboxIds: selectedSandboxes.toJS(),
        },
        refetchQueries: [
          'DeletedSandboxes',
          'PathedSandboxes',
          'RecentSandboxes',
          'SearchSandboxes',
          'ListTemplates',
        ],
        update: cache => {
          if (collections) {
            collections.forEach(({ path, teamId: cacheTeamId }) => {
              try {
                const variables = { path };

                if (cacheTeamId) {
                  variables.teamId = cacheTeamId;
                }

                const oldFolderCacheData = cache.readQuery({
                  query: PathedSandboxes,
                  variables,
                });

                const data = immer(oldFolderCacheData, draft => {
                  draft.me.collection.sandboxes = oldFolderCacheData.me.collection.sandboxes.filter(
                    x => selectedSandboxes.indexOf(x.id) === -1
                  );
                });

                cache.writeQuery({
                  query: PathedSandboxes,
                  variables,
                  data,
                });
              } catch (e) {
                // cache doesn't exist, no biggie!
              }
            });
          }
        },
      })
      .then(() => {
        notificationState.addNotification({
          title: `Successfully created ${selectedSandboxes.length} template${
            selectedSandboxes.length === 1 ? '' : 's'
          }`,
          status: NotificationStatus.SUCCESS,
          actions: {
            primary: [
              {
                label: 'Undo',
                run: () => {
                  track('Template - Removed', {
                    source: 'Undo',
                  });
                  unmakeTemplates(selectedSandboxes.toJS());
                },
              },
            ],
          },
        });
      }),
  ]);
}

export function undeleteSandboxes(selectedSandboxes) {
  client.mutate({
    mutation: AddToCollection,
    variables: {
      sandboxIds: selectedSandboxes.toJS(),
      collectionPath: '/',
    },
    optimisticResponse: {
      __typename: 'Mutation',
      addToCollection: {
        __typename: 'Collection',
        // We keep this empty, because it will be loaded later regardless. We
        // just want the main directory to update immediately
        sandboxes: [],
      },
    },

    refetchQueries: ['DeletedSandboxes'],
  });
}

export function permanentlyDeleteSandboxes(selectedSandboxes) {
  client.mutate({
    mutation: PermanentlyDeleteSandboxes,
    variables: {
      sandboxIds: selectedSandboxes.toJS(),
    },
    update: cache => {
      try {
        const oldDeleteCache = cache.readQuery({
          query: DeletedSandboxes,
        });

        const newDeleteCache = {
          ...oldDeleteCache,
          me: {
            ...oldDeleteCache.me,
            sandboxes: oldDeleteCache.me.sandboxes.filter(
              x => selectedSandboxes.indexOf(x.id) === -1
            ),
          },
        };

        cache.writeQuery({
          query: DeletedSandboxes,
          data: newDeleteCache,
        });
      } catch (e) {
        // cache doesn't exist, no biggie!
      }
    },
  });
}

export function deleteSandboxes(selectedSandboxes, collections = []) {
  client.mutate({
    mutation: DeleteSandboxes,
    variables: {
      sandboxIds: selectedSandboxes.toJS(),
    },
    refetchQueries: [
      'DeletedSandboxes',
      'PathedSandboxes',
      'RecentSandboxes',
      'SearchSandboxes',
    ],
    update: cache => {
      if (collections) {
        collections.forEach(({ path, teamId }) => {
          try {
            const variables = { path };

            if (teamId) {
              variables.teamId = teamId;
            }

            const oldFolderCacheData = cache.readQuery({
              query: PathedSandboxes,
              variables,
            });

            const data = immer(oldFolderCacheData, draft => {
              draft.me.collection.sandboxes = oldFolderCacheData.me.collection.sandboxes.filter(
                x => selectedSandboxes.indexOf(x.id) === -1
              );
            });

            cache.writeQuery({
              query: PathedSandboxes,
              variables,
              data,
            });
          } catch (e) {
            // cache doesn't exist, no biggie!
          }
        });
      }
    },
  });
}

export function setSandboxesPrivacy(selectedSandboxes, privacy) {
  client.mutate({
    mutation: SetSandboxesPrivacy,
    variables: {
      sandboxIds: selectedSandboxes.toJS(),
      privacy,
    },
  });
}
