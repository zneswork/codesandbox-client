import React from 'react';
import { uniq } from 'lodash-es';
import { Query } from 'react-apollo';
import RemoveIcon from 'react-icons/lib/md/highlight-remove';
import { Observer } from 'app/componentConnectors';
import { DeletedSandboxes as DeletedSandboxesQuery } from 'app/graphql/queries';
import Sandboxes from '../../Sandboxes';

const DeletedSandboxes = () => {
  document.title = 'Deleted Sandboxes - CodeSandbox';

  return (
    <Query fetchPolicy="cache-and-network" query={DeletedSandboxesQuery}>
      {({ loading, error, data }) => (
        <Observer>
          {({ store, signals }) => {
            if (error) {
              return <div>Error!</div>;
            }

            const sandboxes = loading
              ? []
              : (data && data.me && data.me.sandboxes) || [];

            const possibleTemplates = uniq(
              sandboxes.map(x => x.source.template)
            );

            const orderedSandboxes = store.dashboard.getFilteredSandboxes(
              sandboxes
            );
            signals.dashboard.setTrashSandboxes({
              sandboxIds: orderedSandboxes.map(i => i.id),
            });

            return (
              <Sandboxes
                isLoading={loading}
                Header="Deleted Sandboxes"
                sandboxes={orderedSandboxes}
                possibleTemplates={possibleTemplates}
                actions={
                  orderedSandboxes.length
                    ? [
                        {
                          name: 'Empty Trash',
                          Icon: <RemoveIcon />,
                          run: () => {
                            signals.modalOpened({
                              modal: 'emptyTrash',
                            });
                          },
                        },
                      ]
                    : []
                }
              />
            );
          }}
        </Observer>
      )}
    </Query>
  );
};

export default DeletedSandboxes;
