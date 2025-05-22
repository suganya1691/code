import { createSelector } from "reselect";

const getAll = (state) => state.employees.employees;
const getQuery = (state) => state.employees.searchText;
const getSort = (state) => state.employees.sortOrder;
const getSortBy = (state) => state.employees.sortBy;
const getPage = (state) => state.employees.currentPage;
const getSize = (state) => state.employees.pageSize;

console.log('Sort Order', getSort);
export const getFiltered = createSelector([getAll, getQuery], (all, query) =>{
  if (!query) return all;

  const q = query.toLowerCase();
  console.log('query', q)
  return all.filter((e) => {
    return (
      e.id.toString().includes(q) ||
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
      e.contactNo?.toLowerCase().includes(q) ||
      e.address?.toLowerCase().includes(q)
    );
  });
});



export const getSorted = createSelector(
  [getFiltered, getSortBy, getSort],
  (emps, field, order) => {
    const sorted = [...emps];

    if (!field || !order) return sorted;

    return sorted.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (aVal == null || bVal == null) return 0;

      if (typeof aVal === 'string') {
        return order === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // For numbers/dates/other
      return order === 'asc'
        ? (aVal > bVal ? 1 : -1)
        : (aVal < bVal ? 1 : -1);
    });
  }
);

export const getPaginated = createSelector(
  [getSorted, getPage, getSize],
  (emps, page, size) => emps.slice((page - 1) * size, page * size)
);

export const getSelectedEmployee = (state) => state.employees.selectedEmployee;