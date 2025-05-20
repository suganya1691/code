import { createSelector } from "reselect";

const getAll = (state) => state.employees.employees;
const getQuery = (state) => state.employees.searchText;
const getSort = (state) => state.employees.sortOrder;
const getPage = (state) => state.employees.currentPage;
const getSize = (state) => state.employees.pageSize;

console.log('Sort Order', getSort);
export const getFiltered = createSelector([getAll, getQuery], (all, query) =>
  all.filter((e) => e.firstName.toLowerCase().includes(query.toLowerCase()))
);

export const getSorted = createSelector([getFiltered, getSort], (emps, sort) => {
  const sorted = [...emps];
  if (sort === "asc") return sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
  if (sort === "desc") return sorted.sort((a, b) => b.firstName.localeCompare(a.firstName));
  return sorted;
});

export const getPaginated = createSelector(
  [getSorted, getPage, getSize],
  (emps, page, size) => emps.slice((page - 1) * size, page * size)
);

export const getSelectedEmployee = (state) => state.employees.selectedEmployee;