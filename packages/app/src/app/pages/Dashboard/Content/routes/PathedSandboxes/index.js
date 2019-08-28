import React from 'react';
import { Query } from 'react-apollo';
import { basename } from 'path';
import { Observer } from 'app/componentConnectors';
import { PathedSandboxes as PathedSandboxesQuery } from 'app/graphql/queries';
import getMostUsedTemplate from '../../../utils/get-most-used-template';
import { getPossibleTemplates } from '../../Sandboxes/utils';
import Sandboxes from '../../Sandboxes';
import CreateNewSandbox from '../../CreateNewSandbox';
import Navigation from './Navigation';
// import Folders from './Folders';

const PathedSandboxes = props => {
  const path = '/' + decodeURIComponent(props.match.params.path || '');
  const teamId = props.match.params.teamId;

  document.title = `${basename(path) || 'Dashboard'} - CodeSandbox`;
  return (
    <Query query={PathedSandboxesQuery} variables={{ path, teamId }}>
      {({ loading, error, data }) => (
        <Observer>
          {({ store }) => {
            if (error) {
              console.error(error);
              return <div>Error!</div>;
            }

            const sandboxes =
              loading || !data.me.collection
                ? []
                : data.me.collection.sandboxes;

            const possibleTemplates = getPossibleTemplates(sandboxes);

            // We want to hide all templates
            // TODO: make this a query variable for graphql and move the logic to the server
            const noTemplateSandboxes = sandboxes.filter(
              s => !s.customTemplate
            );
            const orderedSandboxes = store.dashboard.getFilteredSandboxes(
              noTemplateSandboxes
            );

            let mostUsedTemplate = null;
            if (!loading) {
              try {
                mostUsedTemplate = getMostUsedTemplate(sandboxes);
              } catch (e) {
                // Not critical
              }
            }

            return (
              <Sandboxes
                ExtraElement={({ style }) => (
                  <CreateNewSandbox
                    collectionId={
                      data &&
                      data.me &&
                      data.me.collection &&
                      data.me.collection.id
                    }
                    mostUsedSandboxTemplate={mostUsedTemplate}
                    style={style}
                  />
                )}
                isLoading={loading}
                possibleTemplates={possibleTemplates}
                Header={<Navigation teamId={teamId} path={path} />}
                // Fix React Virtualized First
                // SubHeader={
                //   <Folders me={data.me} loading={loading} teamId={teamId} />
                // }
                sandboxes={orderedSandboxes}
              />
            );
          }}
        </Observer>
      )}
    </Query>
  );
};

export default PathedSandboxes;
