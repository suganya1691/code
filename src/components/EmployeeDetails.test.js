import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EmployeeDetails from './EmployeeDetails';

const mockEmployee = {
  firstName: 'John',
  lastName: 'Doe',
  age: 35,
  jobTitle: 'Software Engineer',
  dateJoined: '2023-01-01',
  bio: 'Experienced in full stack development.',
  avatar: 'https://example.com/avatar.jpg',
};

describe('EmployeeDetails Component', () => {
  let onCloseMock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    render(<EmployeeDetails employee={mockEmployee} onClose={onCloseMock} />);
  });

  it('renders employee details correctly', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/35/)).toBeInTheDocument();
    expect(screen.getByAltText('John')).toHaveAttribute('src', mockEmployee.avatar);
    expect(screen.getByText(/Experienced in full stack development/)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the modal', () => {
    fireEvent.mouseDown(document);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
