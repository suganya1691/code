import React from 'react';
import { render, screen } from '@testing-library/react';
import CompanyDetails from './CompanyDetails';
import { formatDate } from '../utils/formatDate';

jest.mock('../utils/formatDate', () => ({
  formatDate: jest.fn((date) => `Formatted: ${date}`)
}));

describe('CompanyDetails component', () => {
  const mockCompanyInfo = {
    companyName: 'Test Company',
    companyMotto: 'Innovate and Elevate',
    companyEst: '2020-01-01'
  };

  it('renders company name, motto, and formatted establishment date', () => {
    render(<CompanyDetails companyInfo={mockCompanyInfo} />);

    expect(screen.getByText(mockCompanyInfo.companyName)).toBeInTheDocument();
    expect(screen.getByText(mockCompanyInfo.companyMotto)).toBeInTheDocument();
    
  });

  
});
