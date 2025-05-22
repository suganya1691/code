import {
  getFiltered,
  getSorted,
  getPaginated,
  getSelectedEmployee,
} from './employeeSelectors';

describe('employeeSelectors', () => {
  const sampleEmployees = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', contactNo: '123', address: 'NY' },
    { id: 2, firstName: 'Bob', lastName: 'Jones', contactNo: '456', address: 'LA' },
    { id: 3, firstName: 'Charlie', lastName: 'Brown', contactNo: '789', address: 'SF' },
  ];

  const baseState = {
    employees: {
      employees: sampleEmployees,
      searchText: '',
      sortBy: 'firstName',
      sortOrder: 'asc',
      currentPage: 1,
      pageSize: 2,
      selectedEmployee: sampleEmployees[0],
    },
  };

  describe('getFiltered', () => {
    it('returns all employees when no query is set', () => {
      const result = getFiltered(baseState);
      expect(result).toHaveLength(3);
    });

    it('filters by full name', () => {
      const state = {
        ...baseState,
        employees: { ...baseState.employees, searchText: 'bob' },
      };
      const result = getFiltered(state);
      expect(result).toEqual([sampleEmployees[1]]);
    });

    it('filters by contact number', () => {
      const state = {
        ...baseState,
        employees: { ...baseState.employees, searchText: '456' },
      };
      const result = getFiltered(state);
      expect(result).toEqual([sampleEmployees[1]]);
    });

    it('filters by address', () => {
      const state = {
        ...baseState,
        employees: { ...baseState.employees, searchText: 'ny' },
      };
      const result = getFiltered(state);
      expect(result).toEqual([sampleEmployees[0]]);
    });
  });

  describe('getSorted', () => {
    it('sorts employees by firstName ascending', () => {
      const result = getSorted(baseState);
      expect(result.map((e) => e.firstName)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('sorts employees by firstName descending', () => {
      const state = {
        ...baseState,
        employees: { ...baseState.employees, sortOrder: 'desc' },
      };
      const result = getSorted(state);
      expect(result.map((e) => e.firstName)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('sorts by id ascending', () => {
      const state = {
        ...baseState,
        employees: { ...baseState.employees, sortBy: 'id', sortOrder: 'asc' },
      };
      const result = getSorted(state);
      expect(result.map((e) => e.id)).toEqual([1, 2, 3]);
    });
  });

  describe('getPaginated', () => {
    it('returns first page with pageSize 2', () => {
      const result = getPaginated(baseState);
      expect(result).toHaveLength(2);
      expect(result.map((e) => e.id)).toEqual([1, 2]);
    });

    it('returns second page with 1 employee', () => {
      const state = {
        ...baseState,
        employees: { ...baseState.employees, currentPage: 2 },
      };
      const result = getPaginated(state);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });
  });

  describe('getSelectedEmployee', () => {
    it('returns selected employee', () => {
      const result = getSelectedEmployee(baseState);
      expect(result).toEqual(sampleEmployees[0]);
    });
  });
});
