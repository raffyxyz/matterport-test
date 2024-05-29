import { gql } from "graphql-request";

export const queryModels = gql`
  query getModels(
    $query: String
    $offset: String
    $pageSize: Int
    $sortField: ModelSortField!
    $sortOrder: SortOrder
  ) {
    models(
      query: $query
      offset: $offset
      include: inactive
      pageSize: $pageSize
      sortBy: { field: $sortField, order: $sortOrder }
    ) {
      totalResults
      nextOffset
      results {
        id
        name
        upload_date: created
        status: state
        privacy: visibility
      }
    }
  }
`;

export const updateModelStatus = gql`
  mutation toggleModelActivation($modelId: ID!, $state: ModelStateChange!) {
    updateModelState(id: $modelId, state: $state, allowActivate: true) {
      id
    }
  }
`;

export const updateModelPrivacy = gql`
  mutation toggleModelVisibility($modelId: ID!, $visibility: ModelVisibility!) {
    updateModelVisibility(
      id: $modelId
      visibility: $visibility # public or private
    ) {
      id
      publication {
        published
        url
        externalUrl
        embed
      }
    }
  }
`;

export const patchModelName = gql`
  mutation patchModelInfo($id: ID!, $name: String!) {
    patchModel(id: $id, patch: { name: $name }) {
      id
    }
  }
`;
