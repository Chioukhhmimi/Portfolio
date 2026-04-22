import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check hero section loads
  await expect(page.locator('text=Azul 👋')).toBeVisible();
  
  // Check navbar
  await expect(page.locator('text=ⵃⵎⵉⵎⵉ').first()).toBeVisible();
  await expect(page.getByRole('link', { name: "Let's Talk" }).first()).toBeVisible();
  
  // Check projects section
  await expect(page.locator('text=Projects I worked on').first()).toBeVisible();
  
  // Check contact section - use exact match
  await expect(page.getByText('Get in Touch', { exact: true })).toBeVisible();
  
  console.log('All checks passed!');
});