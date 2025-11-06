const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Book API Endpoints', () => {

  // --- GET all books ---
  it('should return all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // --- GET single book ---
  it('should return a specific book by ID', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'The Great Gatsby');
  });

  // --- POST new book ---
  it('should add a new book', async () => {
    const newBook = {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Dystopian',
      copiesAvailable: 4
    };
    const res = await request(app).post('/api/books').send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Brave New World');
  });

  // --- PUT update existing book ---
  it('should update a book', async () => {
    const res = await request(app)
      .put('/api/books/1')
      .send({ copiesAvailable: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.copiesAvailable).toBe(10);
  });

  // --- DELETE a book ---
  it('should delete a book', async () => {
    const res = await request(app).delete('/api/books/2');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'To Kill a Mockingbird');
  });

  // --- GET non-existent book ---
  it('should return 404 for invalid book ID', async () => {
    const res = await request(app).get('/api/books/999');
    expect(res.statusCode).toBe(404);
  });
});
