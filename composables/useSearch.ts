// Navigate to search with new queries
export const navigateSearch = async (newQuery) => {
  return await navigateTo({
    path: "/search",
    query: newQuery
  }, {
    replace: true
  })
}
