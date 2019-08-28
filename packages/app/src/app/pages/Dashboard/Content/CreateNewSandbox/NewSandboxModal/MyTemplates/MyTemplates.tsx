import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { sandboxUrl } from '@codesandbox/common/lib/utils/url-generator';
import CustomTemplate from '@codesandbox/common/lib/components/CustomTemplate';
import { ListTemplates } from 'app/graphql/queries';
import history from 'app/utils/history';
import { Title } from '../elements';
import { MyTemplatesList } from './elements';

// Would be good to actually have this interface filled out
// Would be better if we could generate types from our GraphQL server
interface ListTemplatesResponse {
  me?: any;
}

interface Props {
  selectTemplate?: (params: { shortid: string }) => void;
}

export const MyTemplates = ({ selectTemplate }: Props) => {
  const { data = {} } = useQuery<ListTemplatesResponse>(ListTemplates, {
    variables: { showAll: true },
    fetchPolicy: 'cache-and-network',
  });

  if (data.me && !data.me.templates.length) {
    return null;
  }

  return (
    <>
      <Title>Templates</Title>
      <MyTemplatesList>
        {data.me
          ? data.me.templates.map((template, i) => (
              <CustomTemplate
                template={template}
                key={template.id}
                i={i}
                onClick={() => {
                  if (selectTemplate) {
                    selectTemplate({ shortid: template.sandbox.id });
                  } else {
                    history.push(sandboxUrl(template.sandbox));
                  }
                }}
              />
            ))
          : new Array(3).fill({}).map((_, i) => <CustomTemplate i={i} />)}
      </MyTemplatesList>
    </>
  );
};
