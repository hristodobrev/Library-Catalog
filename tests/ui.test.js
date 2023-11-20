const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000';

test('Verify "All Books" link is visible', async ({ page }) => {
  await page.goto(baseUrl);

  await page.waitForSelector('nav.navbar');
  const allBooksLink = await page.$('a[href="/catalog"]');
  const isLinkVisible = await allBooksLink.isVisible();

  expect(isLinkVisible).toBe(true);
  expect(allBooksLink).not.toBeNull();
});

test('Verify "Login" button is visible', async ({ page }) => {
  await page.goto(baseUrl);

  await page.waitForSelector('nav.navbar');
  const loginLink = await page.$('a[href="/login"]');
  const isLoginVisible = await loginLink.isVisible();

  expect(isLoginVisible).toBe(true);
  expect(loginLink).not.toBeNull();
});

test('Verify "Register" button is visible', async ({ page }) => {
  await page.goto(baseUrl);

  await page.waitForSelector('nav.navbar');
  const registerLink = await page.$('a[href="/register"]');
  const isRegisterVisible = await registerLink.isVisible();

  expect(isRegisterVisible).toBe(true);
  expect(registerLink).not.toBeNull();
});

test('Verify "All Books" is visible after user login', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  await page.waitForSelector('nav.navbar');
  const allBooksLink = await page.$('a[href="/catalog"]');
  const isLinkVisible = await allBooksLink.isVisible();

  expect(isLinkVisible).toBe(true);
  expect(allBooksLink).not.toBeNull();
});

test('Verify "My Books" is visible after user login', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  await page.waitForSelector('nav.navbar');
  const myBooksLink = await page.$('a[href="/profile"]');
  const isLinkVisible = await myBooksLink.isVisible();

  expect(isLinkVisible).toBe(true);
  expect(myBooksLink).not.toBeNull();
});

test('Verify "Add Book" is visible after user login', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  await page.waitForSelector('nav.navbar');
  const addBookLink = await page.$('a[href="/create"]');
  const isLinkVisible = await addBookLink.isVisible();

  expect(isLinkVisible).toBe(true);
  expect(addBookLink).not.toBeNull();
});

test('Verify "Logout" is visible after user login', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  await page.waitForSelector('nav.navbar');
  const logoutLink = await page.$('#logoutBtn');
  const isLinkVisible = await logoutLink.isVisible();

  expect(isLinkVisible).toBe(true);
  expect(logoutLink).not.toBeNull();
});

test('Verify welcome message is visible after user login', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  await page.waitForSelector('nav.navbar');
  const userElement = page.locator('#user > span');

  await expect(userElement).toHaveText('Welcome, peter@abv.bg');
});

test('Login with valid credentials', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  await page.$('a[href="/catalog"]');
  expect(page.url()).toBe(`${baseUrl}/catalog`);
});

test('Login with empty credentials', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/login"]');
  expect(page.url()).toBe(`${baseUrl}/login`);
});

test('Login with empty email', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="password"]', '123456');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/login"]');
  expect(page.url()).toBe(`${baseUrl}/login`);
});

test('Login with empty password', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/login"]');
  expect(page.url()).toBe(`${baseUrl}/login`);
});

test('Register with valid credentials', async ({ page }) => {
  await page.goto(`${baseUrl}/register`);

  await page.fill('input[name="email"]', `gosho${new Date().getTime()}@abv.bg`);
  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm-pass"]', '123456');
  await page.click('input[type="submit"]');

  await page.$('a[href="/catalog"]');
  expect(page.url()).toBe(`${baseUrl}/catalog`);
});

test('Register with empty credentials', async ({ page }) => {
  await page.goto(`${baseUrl}/register`);

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(`${baseUrl}/register`);
});

test('Register with empty email', async ({ page }) => {
  await page.goto(`${baseUrl}/register`);

  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm-pass"]', '123456');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(`${baseUrl}/register`);
});

test('Register with empty passwords', async ({ page }) => {
  await page.goto(`${baseUrl}/register`);

  await page.fill('input[name="email"]', 'peter@abv.bg');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(`${baseUrl}/register`);
});

test('Register with empty password', async ({ page }) => {
  await page.goto(`${baseUrl}/register`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="confirm-pass"]', '123456');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(`${baseUrl}/register`);
});

test('Register with empty confirm password', async ({ page }) => {
  await page.goto(`${baseUrl}/register`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(`${baseUrl}/register`);
});

test('Register with different passwords', async ({ page }) => {
  await page.goto(`${baseUrl}/register`);

  await page.fill('input[name="email"]', 'gosho@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm-pass"]', '12345');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Passwords don\'t match!');

    await dialog.accept();
  });

  await page.click('input[type="submit"]');

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(`${baseUrl}/register`);
});

test('Add book with correct data', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(`${baseUrl}/catalog`)
  ]);

  await page.click('a[href="/create"]');

  await page.waitForSelector('#create-form');

  await page.fill('#title', 'Test Book');
  await page.fill('#description', 'This is a test book description');
  await page.fill('#image', 'https://example.com/book-image.jpg');
  await page.selectOption('#type', 'Fiction');

  await page.click('#create-form input[type="submit"]');

  await page.waitForURL(`${baseUrl}/catalog`);

  expect(page.url()).toBe(`${baseUrl}/catalog`);
});

test('Add book with empty title field', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(`${baseUrl}/catalog`)
  ]);

  await page.click('a[href="/create"]');

  await page.waitForSelector('#create-form');

  await page.fill('#description', 'This is a test book description');
  await page.fill('#image', 'https://example.com/book-image.jpg');
  await page.selectOption('#type', 'Fiction');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('#create-form input[type="submit"]');

  await page.$(`a[href="/create"]`);

  expect(page.url()).toBe(`${baseUrl}/create`);
});

test('Add book with empty description field', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(`${baseUrl}/catalog`)
  ]);

  await page.click('a[href="/create"]');

  await page.waitForSelector('#create-form');

  await page.fill('#title', 'Test Book');
  await page.fill('#image', 'https://example.com/book-image.jpg');
  await page.selectOption('#type', 'Fiction');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('#create-form input[type="submit"]');

  await page.$(`a[href="/create"]`);

  expect(page.url()).toBe(`${baseUrl}/create`);
});

test('Add book with empty image field', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(`${baseUrl}/catalog`)
  ]);

  await page.click('a[href="/create"]');

  await page.waitForSelector('#create-form');

  await page.fill('#title', 'Test Book');
  await page.fill('#description', 'This is a test book description');
  await page.selectOption('#type', 'Fiction');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');

    await dialog.accept();
  });

  await page.click('#create-form input[type="submit"]');

  await page.$(`a[href="/create"]`);

  expect(page.url()).toBe(`${baseUrl}/create`);
});

test('Login and verify all books are displayed', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(`${baseUrl}/catalog`)
  ]);

  await page.waitForSelector('.dashboard');

  const bookElements = await page.$$('.other-books-list li');

  expect(bookElements.length).toBeGreaterThan(0);
});

test('Login and navigate to Details page', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(`${baseUrl}/catalog`)
  ]);

  await page.waitForSelector('.otherBooks');

  const bookTitle = await page.locator('.otherBooks h3').first().textContent();

  await page.click('.otherBooks a.button');

  await page.waitForSelector('#details-page');

  const detailsPageTitle = await page.textContent('.book-information h3');
  expect(detailsPageTitle).toEqual(bookTitle);
});

test('Verify guest can go to Details page', async ({ page }) => {
  await page.goto(`${baseUrl}/catalog`);

  await page.waitForSelector('.otherBooks');

  const bookTitle = await page.locator('.otherBooks h3').first().textContent();

  await page.click('.otherBooks a.button');

  await page.waitForSelector('.book-information');

  const detailsPageTitle = await page.textContent('.book-information h3');
  expect(detailsPageTitle).toEqual(bookTitle);
});

test('Verify Details page have correct data', async ({ page }) => {
  await page.goto(`${baseUrl}/catalog`);

  await page.waitForSelector('.otherBooks');

  const bookTitle = await page.locator('.otherBooks h3').first().textContent();

  await page.click('.otherBooks a.button');

  await page.waitForSelector('#details-page');

  const detailsPageTitle = await page.textContent('.book-information h3');
  const type = await page.$('p.type');
  const img = await page.$('p.img');
  const actions = await page.$('div.actions');
  const description = await page.$('div.book-description');
  
  expect(detailsPageTitle).toEqual(bookTitle);
  expect(type).not.toBeNull();
  expect(img).not.toBeNull();
  expect(actions).not.toBeNull();
  expect(description).not.toBeNull();
});

test('Verify Edit and Delete buttons are visible for logged in user', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');
  
  await page.goto(`${baseUrl}/profile`);
  await page.waitForSelector('.my-books-list');

  await page.click('.otherBooks a.button');
  await page.waitForSelector('#details-page');

  const buttons = await page.$$('.actions a');
  expect(buttons).toHaveLength(2);
  
  expect(await buttons[0].textContent()).toEqual('Edit');
  expect(await buttons[1].textContent()).toEqual('Delete');
});

test('Verify Like button is not visible for creator', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', 'john@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');
  
  await page.goto(`${baseUrl}/profile`);
  await page.waitForSelector('.my-books-list');

  await page.click('.otherBooks a.button');
  await page.waitForSelector('#details-page');

  const buttons = await page.$$('.actions a');
  expect(buttons).toHaveLength(2);
  
  expect(await buttons[0].textContent()).toEqual('Edit');
  expect(await buttons[1].textContent()).toEqual('Delete');
});