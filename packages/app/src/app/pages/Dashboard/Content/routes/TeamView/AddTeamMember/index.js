import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import Input from '@codesandbox/common/lib/components/Input';
import { Button } from '@codesandbox/common/lib/components/Button';
import track from '@codesandbox/common/lib/utils/analytics';
import { inject, hooksObserver } from 'app/componentConnectors';
import { InviteToTeam } from 'app/graphql/mutations';

const ErrorMessage = styled.div`
  color: ${props => props.theme.red};
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const AddTeamMember = ({ teamId, signals }) => (
  <Mutation mutation={InviteToTeam}>
    {(mutate, { loading, error }) => {
      let input = null;

      const submit = e => {
        e.preventDefault();
        e.stopPropagation();

        let isEmail = input.value.indexOf('@') > -1;

        track('Team - Add Member', { email: isEmail });

        isEmail = false;

        // We don't enable email for now for privacy reasons

        const variables = { teamId };

        const value = input.value;
        if (isEmail) {
          variables.email = value;
        } else {
          variables.username = value;
        }

        mutate({
          variables,
        }).then(() => {
          signals.notificationAdded({
            message: `${value} has been invited!`,
            type: 'success',
          });
        });

        input.value = '';
      };

      const errorMessage =
        error && error.graphQLErrors && error.graphQLErrors[0].message;

      return (
        <React.Fragment>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <form
            style={{ display: 'flex' }}
            onSubmit={loading ? undefined : submit}
          >
            <Input
              ref={node => {
                input = node;
              }}
              placeholder="Add member by username"
              block
            />
            <Button disabled={loading} style={{ width: 200 }} small>
              {loading ? 'Adding Member...' : 'Add Member'}
            </Button>
          </form>
        </React.Fragment>
      );
    }}
  </Mutation>
);

export default inject('signals')(hooksObserver(AddTeamMember));
