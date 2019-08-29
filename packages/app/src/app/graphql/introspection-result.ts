export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'FollowEntity',
        possibleTypes: [
          {
            name: 'User',
          },
          {
            name: 'Team',
          },
        ],
      },
    ],
  },
};

export default result;
