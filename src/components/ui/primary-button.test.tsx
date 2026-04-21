import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PrimaryButton } from './primary-button';

describe('PrimaryButton', () => {
  it('renders label prop', () => {
    const { getByText } = render(
      <PrimaryButton label="Submit" onClick={() => {}} />
    );
    expect(getByText('Submit')).toBeDefined();
  });

  it('calls onClick handler when clicked', () => {
    let called = false;
    const { getByRole } = render(
      <PrimaryButton label="Click Me" onClick={() => { called = true; }} />
    );
    fireEvent.click(getByRole('button'));
    expect(called).toBe(true);
  });

  it('is disabled when disabled=true', () => {
    const { getByRole } = render(
      <PrimaryButton label="Disabled" disabled onClick={() => {}} />
    );
    expect(getByRole('button')).toBeDisabled();
  });

  it('shows loading spinner and disables interaction when loading', () => {
    const { getByRole, getByLabelText } = render(
      <PrimaryButton label="Loading" loading onClick={() => {}} />
    );
    const btn = getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
    expect(btn.querySelector('svg')).toBeDefined();
  });

  it('renders with size and variant props', () => {
    const { getByRole } = render(
      <PrimaryButton label="Big Secondary" size="lg" variant="secondary" onClick={() => {}} />
    );
    const btn = getByRole('button');
    expect(btn.className).toMatch(/py-3/);
    expect(btn.className).toMatch(/bg-secondary-700/);
  });

  it('renders ghost variant', () => {
    const { getByRole } = render(
      <PrimaryButton label="Ghost" variant="ghost" onClick={() => {}} />
    );
    expect(getByRole('button').className).toMatch(/bg-transparent/);
  });

  it('renders small size', () => {
    const { getByRole } = render(
      <PrimaryButton label="Small" size="sm" onClick={() => {}} />
    );
    expect(getByRole('button').className).toMatch(/py-1.5/);
  });

  it('does not fire onClick when disabled', () => {
    let called = false;
    const { getByRole } = render(
      <PrimaryButton label="NoClick" disabled onClick={() => { called = true; }} />
    );
    fireEvent.click(getByRole('button'));
    expect(called).toBe(false);
  });

  it('does not fire onClick when loading', () => {
    let called = false;
    const { getByRole } = render(
      <PrimaryButton label="NoClick" loading onClick={() => { called = true; }} />
    );
    fireEvent.click(getByRole('button'));
    expect(called).toBe(false);
  });

  it('handles empty string label', () => {
    const { getByRole } = render(
      <PrimaryButton label="" onClick={() => {}} />
    );
    expect(getByRole('button')).toBeDefined();
  });
});
