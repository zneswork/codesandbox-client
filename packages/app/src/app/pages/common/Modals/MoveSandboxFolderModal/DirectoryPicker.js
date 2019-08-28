import React from 'react';
import { Query } from 'react-apollo';
import { TeamsSidebar } from 'app/graphql/queries';
import DirectoryComponent from 'app/pages/Dashboard/Sidebar/SandboxesItem';
import { TeamContainer, TeamName } from './elements';

export default ({ onSelect, currentPath, currentTeamId }) => (
  <div css={{ margin: '0 -1rem' }}>
    <DirectoryComponent
      openByDefault
      onSelect={onSelect}
      currentPath={currentPath}
      currentTeamId={currentTeamId}
      teamId={undefined}
    />

    <Query query={TeamsSidebar}>
      {({ loading, data, error }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return null;
        }

        const teams = data.me.teams;

        return teams.map(team => (
          <TeamContainer key={team.id}>
            <TeamName>{team.name}</TeamName>
            <DirectoryComponent
              currentPath={currentPath}
              currentTeamId={currentTeamId}
              openByDefault
              teamId={team.id}
              onSelect={onSelect}
            />
          </TeamContainer>
        ));
      }}
    </Query>
  </div>
);
