import gql from 'graphql-tag'
import pluralize, { singular } from 'pluralize'
import { createFilter } from 'ra-postgraphile/build/module/filters'
import { getManyReference } from 'ra-postgraphile/build/module/getManyReference'
import {
  capitalize,
  createGetListQuery,
  createGetManyQuery,
  createQueryFromType,
  createSortingKey,
  createTypeMap,
  // escapeIdType,
  lowercase,
  mapInputToVariables
} from 'ra-postgraphile/build/module/utils'

import {
  Factory,
  ManyReferenceParams,
  NATURAL_SORTING,
  QueryMap,
  Response,
  UpdateManyParams,
  VERB_CREATE,
  VERB_DELETE,
  VERB_DELETE_MANY,
  VERB_GET_LIST,
  VERB_GET_MANY,
  VERB_GET_MANY_REFERENCE,
  VERB_GET_ONE,
  VERB_UPDATE,
  VERB_UPDATE_MANY
} from 'ra-postgraphile/build/module/types'

// cache for all types
let typeMap
let queryMap

export const escapeIdType = (id) => String(id).replace(/-/gi, '_').replace(/=/gi, '_')

export const mapType = (idType, value) =>
  ['uuid', 'string'].includes(idType.name.toLowerCase())
    ? value
    : parseInt(value, 10)

export const buildQuery = (introspectionResults, factory) => (
  raFetchType,
  resName,
  params
) => {
  if (!raFetchType || !resName) {
    return { data: null }
  }

  // We do this here because react-admin is sometimes not consistent with the case (EditGuesser, etc)
  const resourceName = singular(resName)

  const options = factory.options
  // By default we don't query for any complex types on the object, just scalars and scalars[]
  const allowedComplexTypes = Object.keys(options.queryValueToInputValueMap)

  const resourceTypename = capitalize(resourceName)
  const { types, queries } = introspectionResults
  if (!queryMap) {
    // tslint:disable-next-line:no-expression-statement
    queryMap = createTypeMap(queries)
  }
  if (!typeMap) {
    // tslint:disable-next-line:no-expression-statement
    typeMap = createTypeMap(types)
  }
  const type = typeMap[resourceTypename]
  const manyLowerResourceName = pluralize(lowercase(resourceTypename))
  const singleLowerResourceName = lowercase(resourceTypename)
  const idField = type.fields.find((thisType) => thisType.name === 'rowId')
  // tslint:disable-next-line:no-let
  let idType = idField.type
  if (!idType) {
    throw new Error('All types currently require an `id` field.')
  }
  if (idType.ofType) {
    // tslint:disable-next-line:no-expression-statement
    idType = idType.ofType
  }

  switch (raFetchType) {
    case VERB_GET_ONE:

      return {
        query: gql`query ${singleLowerResourceName}($id: ${idType.name}!) {
            ${singleLowerResourceName}(rowId: $id) {
            ${createQueryFromType(
              resourceTypename,
              typeMap,
              allowedComplexTypes
            )}
        }
        }`,
        variables: {
          id: mapType(idType, params.id)
        },
        parseResponse: (response) => {
          return { 
            data: {
              ...response.data[singleLowerResourceName],
              id: response.data[singleLowerResourceName].id,
            }
          }
        }
      }
    case VERB_GET_MANY:
      return {
        // query: createGetManyQuery(
        //   type,
        //   manyLowerResourceName,
        //   resourceTypename,
        //   typeMap,
        //   queryMap,
        //   allowedComplexTypes,
        //   idType.name
        // ),
        query: gql`
          query ${manyLowerResourceName}($filters: [${resourceTypename}Filter!]) {
              ${manyLowerResourceName}(filter: { or: $filters }) {
              nodes {
                  ${createQueryFromType(resourceTypename, typeMap, allowedComplexTypes)}
              }
            }
          }`,
        variables: {
          filters: params.ids
            .filter((v) => typeof v !== 'undefined')
            .map(id => {
              return { rowId: { equalTo: id } }
            })
        },
        parseResponse: (response) => {
          const { nodes } = response.data[manyLowerResourceName]
          return { 
            data: nodes.map(node => ({
              ...node,
              id: node.rowId,
            }))
          }
        }
      }
    case VERB_GET_MANY_REFERENCE:
      const manyReference = getManyReference(
        params,
        type,
        manyLowerResourceName,
        resourceTypename,
        typeMap,
        queryMap,
        allowedComplexTypes
      )
      return {
        ...manyReference,
        parseResponse: response => {
          response = manyReference.parseResponse(response)
          response.data.forEach(data => {
            data.id = data.rowId
          })
          return response
        }
      }
    case VERB_GET_LIST: {
      const { filter, sort } = params
      const orderBy = sort
        ? [createSortingKey(sort.field, sort.order)]
        : [NATURAL_SORTING]
      const filters = createFilter(filter, type)
      return {
        query: createGetListQuery(
          type,
          manyLowerResourceName,
          resourceTypename,
          typeMap,
          queryMap,
          allowedComplexTypes
        ),
        variables: {
          offset: (params.pagination.page - 1) * params.pagination.perPage,
          first: params.pagination.perPage,
          filter: filters,
          orderBy
        },
        parseResponse: (response) => {
          const { nodes, totalCount } = response.data[manyLowerResourceName]
          nodes.forEach(node => {
            node.id = node.rowId
          })
          return { data: nodes, total: totalCount }
        }
      }
    }
    case VERB_CREATE: {
      const variables = {
        input: {
          [singleLowerResourceName]: mapInputToVariables(
            params.data,
            typeMap[`${resourceTypename}Input`],
            type,
            options.queryValueToInputValueMap
          )
        }
      }
      return {
        variables,
        query: gql`mutation create${resourceTypename}($input: Create${resourceTypename}Input!) {
          create${resourceTypename} (
          input: $input
        ) {
          ${singleLowerResourceName} {
          ${createQueryFromType(resourceTypename, typeMap, allowedComplexTypes)}
        }
        }
        }`,
        parseResponse: (response) => ({
          data:
            response.data[`create${resourceTypename}`][singleLowerResourceName]
        })
      }
    }
    case VERB_DELETE: {
      return {
        variables: {
          input: {
            id: mapType(idType, params.id)
          }
        },
        query: gql`
          mutation delete${resourceTypename}($input: Delete${resourceTypename}Input!) {
            delete${resourceTypename}(input: $input) {
            ${singleLowerResourceName} {
            ${createQueryFromType(
              resourceTypename,
              typeMap,
              allowedComplexTypes
            )}
          }
          }
          }
        `,
        parseResponse: (response) => ({
          data:
            response.data[`delete${resourceTypename}`][singleLowerResourceName]
        })
      }
    }
    case VERB_DELETE_MANY: {
      const thisIds = (params).ids
      const deletions = thisIds.map(id => ({
        rowId: id,
        clientMutationId: id.toString()
      }))
      return {
        variables: deletions.reduce(
          (next, input) => ({
            [`arg${escapeIdType(input.rowId)}`]: input,
            ...next
          }),
          {}
        ),
        
        query: gql`
            mutation deleteMany${resourceTypename}(
            ${thisIds
              .map(
                id => `$arg${escapeIdType(id)}: Delete${resourceTypename}Input!`
              )
              .join(',')}
            ) {
            ${params.ids.map(
              (id) => `
                k${escapeIdType(
                  id
                )}:delete${resourceTypename}(input: $arg${escapeIdType(id)}) {
                  clientMutationId
                }\n
                `
            )}
            }
        `,
        parseResponse: (response) => ({
          data: params.ids.map((id) =>
            mapType(
              idType,
              response.data[`k${escapeIdType(id)}`].clientMutationId
            )
          )
        })
      }
    }
    case VERB_UPDATE: {
      const updateVariables = {
        input: {
          rowId: mapType(idType, params.id),
          patch: mapInputToVariables(
            params.data,
            typeMap[`${resourceTypename}Patch`],
            type,
            options.queryValueToInputValueMap
          )
        }
      }
      return {
        variables: updateVariables,
        query: gql`
          mutation update${resourceTypename}($input: Update${resourceTypename}Input!) {
            update${resourceTypename}(input: $input) {
            ${singleLowerResourceName} {
            ${createQueryFromType(
              resourceTypename,
              typeMap,
              allowedComplexTypes
            )}
          }
          }
          }
        `,
        parseResponse: (response) => ({
          data:
            response.data[`update${resourceTypename}`][singleLowerResourceName]
        })
      }
    }
    case VERB_UPDATE_MANY: {
      const { ids, data } = params
      const inputs = ids.map(id => ({
        id: mapType(idType, id),
        clientMutationId: id.toString(),
        patch: mapInputToVariables(
          data,
          typeMap[`${resourceTypename}Patch`],
          type,
          options.queryValueToInputValueMap
        )
      }))
      return {
        variables: inputs.reduce(
          (next, input) => ({
            [`arg${escapeIdType(input.id)}`]: input,
            ...next
          }),
          {}
        ),
        query: gql`mutation updateMany${resourceTypename}(
        ${ids
          .map(id => `$arg${escapeIdType(id)}: Update${resourceTypename}Input!`)
          .join(',')}) {
          ${inputs.map(input => {
            return `
             update${escapeIdType(
               input.id
             )}:update${resourceTypename}(input: $arg${escapeIdType(
              input.id
            )}) {
               clientMutationId
             }
            `
          })}
        }`,
        parseResponse: (response) => ({
          data: ids.map(id =>
            mapType(
              idType,
              response.data[`update${escapeIdType(id)}`].clientMutationId
            )
          )
        })
      }
    }
    default:
      throw new Error(`${raFetchType} is not yet implemented.`)
  }
}