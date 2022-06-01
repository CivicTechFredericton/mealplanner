import buildGraphQLProvider from 'ra-data-graphql'
import { buildQuery } from './buildQuery'
import { defaultQueryValueToInputValueMap } from 'ra-postgraphile/build/module/defaultValueInputTypeMapping'

export const factory = (
  client,
  options = { queryValueToInputValueMap: {} },
  graphqlProviderOptions = {}
) => {
  const defaultAppliedOptions = {
    queryValueToInputValueMap: {
      ...defaultQueryValueToInputValueMap,
      ...(options.queryValueToInputValueMap || {})
    }
  }

  return buildGraphQLProvider({
    ...graphqlProviderOptions,
    client,
    buildQuery,
    options: defaultAppliedOptions
  })
}

export default factory