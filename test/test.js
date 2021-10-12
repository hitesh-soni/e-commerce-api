const request = require('supertest')('http://localhost:3000/api/v1');
const { expect } = require('chai');

let auth = {};

before(async () => {
    const response = await request.post('/auth/login').send({
        email: 'shop_user@mailnesia.com',
        password: '123456',
    });
    auth = response.body.body;
});

describe('1. Products', () => {
    it('1. POST /products Returns all products, limited to 10 per page', async () => {
        const response = await request.post('/products').send({
            category: 'mobile-accessories',
            limit: 10,
            page: 1,
        });
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
        expect(response.body.body.length).lessThan(10);
        expect(response.body.body[0]).to.have.property('_id');
        expect(response.body.body[0]).to.have.property('name');
        expect(response.body.body[0]).to.have.property('description');
        expect(response.body.body[0]).to.have.property('price');
        expect(response.body.body[0]).to.have.property('quantity');
        expect(response.body.body[0]).to.have.property('cover_image');
        expect(response.body.body[0]).to.have.property('slug');
        expect(response.body.body[0]).to.have.property('cover_image_url');
    });

    it('2. GET /products/{slug} Returns single product detail', async () => {
        const response = await request.get('/products/john-player-track-pents');
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
        expect(response.body.body).to.have.property('_id');
        expect(response.body.body).to.have.property('name');
        expect(response.body.body).to.have.property('description');
        expect(response.body.body).to.have.property('price');
        expect(response.body.body).to.have.property('quantity');
        expect(response.body.body).to.have.property('category');
        expect(response.body.body).to.have.property('image_url');
        expect(response.body.body).to.have.property('cover_image_url');
    });
});

describe('2. Categories', () => {
    it('1. GET /categories Returns all categories', async () => {
        const response = await request.get('/categories');
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
        expect(response.body.body[0]).to.have.property('_id');
        expect(response.body.body[0]).to.have.property('name');
        expect(response.body.body[0]).to.have.property('description');
        expect(response.body.body[0]).to.have.property('cover_image');
        expect(response.body.body[0]).to.have.property('slug');
        expect(response.body.body[0]).to.have.property('cover_image_url');
    });
});

describe('3. Authentication', () => {
    it('1. POST /auth/login Login user', async () => {
        const response = await request.post('/auth/login').send({
            email: 'shop_user@mailnesia.com',
            password: '123456',
        });
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
        expect(response.body.body).to.have.property('access_token');
        expect(response.body.body).to.have.property('refresh_token');
        expect(response.body.body).to.have.property('expire_time');
        expect(response.body.body).to.have.property('user');
    });

    it('2. POST /auth/token Refresh token', async () => {
        ``
        const response = await request.post('/auth/token').send({
            refresh_token: auth.refresh_token,
        });
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
        expect(response.body.body).to.have.property('access_token');
        expect(response.body.body).to.have.property('refresh_token');
        expect(response.body.body).to.have.property('expire_time');
    });
});

describe('4. Orders', () => {
    it('1. POST /order/create Place order', async () => {
        const response = await request.post('/order/create')
            .set('Authorization', `Bearer ${auth.access_token}`).send({
                products: [
                    {
                        id: '61631ce99f7d3ed8541150e6',
                        quantity: 1,
                    },
                ],
                address: 'Address',
                payment_method: 'Debit card',
            });
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('message');
    });

    it('2. GET /order/list User order history', async () => {
        const response = await request.get('/order/list')
            .set('Authorization', `Bearer ${auth.access_token}`);
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('body');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
    });
});

describe('5. Cart', () => {
    it('1. GET /cart/address Login user', async () => {
        const response = await request.get('/cart/address')
            .set('Authorization', `Bearer ${auth.access_token}`);
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('body');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
        expect(response.body.body[0]).to.have.property('_id');
        expect(response.body.body[0]).to.have.property('country');
        expect(response.body.body[0]).to.have.property('state');
        expect(response.body.body[0]).to.have.property('city');
        expect(response.body.body[0]).to.have.property('pin_code');
        expect(response.body.body[0]).to.have.property('user_id');
    });

    it('2. POST /cart/address Refresh token', async () => {
        const response = await request.post('/cart/address').send({
            address: 'Address',
            city: 'city',
            state: 'state',
            country: 'country',
            pin_code: '789562',
        })
            .set('Authorization', `Bearer ${auth.access_token}`);
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('body');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
        expect(response.body.body).to.have.property('_id');
        expect(response.body.body).to.have.property('country');
        expect(response.body.body).to.have.property('state');
        expect(response.body.body).to.have.property('city');
        expect(response.body.body).to.have.property('pin_code');
        expect(response.body.body).to.have.property('user_id');
    });

    it('3. GET /cart/products Get cart product details', async () => {
        const response = await request.post('/cart/products').send({
            products: ['61631ce99f7d3ed8541150e6'],
        })
            .set('Authorization', `Bearer ${auth.access_token}`);

        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('body');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(200);
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('body');
        expect(response.body.body[0]).to.have.property('_id');
        expect(response.body.body[0]).to.have.property('name');
        expect(response.body.body[0]).to.have.property('description');
        expect(response.body.body[0]).to.have.property('price');
        expect(response.body.body[0]).to.have.property('quantity');
        expect(response.body.body[0]).to.have.property('cover_image');
        expect(response.body.body[0]).to.have.property('image_url');
        expect(response.body.body[0]).to.have.property('cover_image_url');
    });
});