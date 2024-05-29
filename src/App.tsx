import { useEffect, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { client } from "@/gql-client";
import { ModelsTable } from "@/components/common/models/ModelsTable";
import { ModelsPagination } from "@/components/common/models/ModelsPagination";
import { queryModels } from "@/lib/graphql/query-model";
import { useSetOffset } from "@/states/useSetOffset";
import { useRowPage } from "@/states/useRowPage";
import { useQueryParam } from "@/states/useQueryParam";
import { ModelListType } from "@/types";

function App() {
  const offsets = useSetOffset((state) => state.offsets);
  const row = useRowPage((state) => state.row);

  const setQueryParam = useQueryParam((state) => state.setQueryParam);

  // Current offset.
  const offset = offsets.length !== 0 ? offsets.at(-1) : undefined;

  const queryVars = useMemo(
    () => ({
      offset: offset,
      pageSize: row,
    }),
    [offset, row]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["models", queryVars.offset, queryVars.pageSize],
    queryFn: () =>
      client.request<{ models: ModelListType }>(queryModels, {
        query: "*",
        offset: queryVars.offset,
        pageSize: queryVars.pageSize,
        sortField: "created",
        sortType: "desc",
      }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });

  useEffect(() => {
    if (queryVars) {
      setQueryParam(queryVars);
    }
  }, [queryVars, setQueryParam]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log("Data:", data);

  return (
    <>
      <ModelsTable data={data?.models?.results} />
      <ModelsPagination
        total={data?.models?.totalResults}
        nextOffset={data?.models?.nextOffset}
      />
    </>
  );
}

export default App;
