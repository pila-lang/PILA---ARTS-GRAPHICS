'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import path from 'path';
import { addUser, getUser, addProduct, getProducts, deleteProduct, updateAbout } from './data';
import fs from 'fs/promises';

export async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === 'admin@pilaarts.com' && password === 'admin123') {
        cookies().set('pila_session', 'admin-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });
    } else {
        redirect('/admin/login?error=true');
    }
    revalidatePath('/');
    redirect('/admin/dashboard');
}

export async function logout() {
    cookies().set('pila_session', '', { path: '/', expires: new Date(0) });
    cookies().set('pila_customer_session', '', { path: '/', expires: new Date(0) });
    cookies().delete('pila_session');
    cookies().delete('pila_customer_session');

    revalidatePath('/');
    redirect('/');
}

export async function createProduct(formData) {
    const title = formData.get('title');
    const price = parseInt(formData.get('price'));
    const description = formData.get('description');
    const category = formData.get('category');
    const file = formData.get('image');

    if (!file || file.size === 0) {
        throw new Error('No file uploaded');
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public', 'images', 'uploads', fileName);

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);

        const imageUrl = `/images/uploads/${fileName}`;

        addProduct({
            title,
            price,
            description,
            imageUrl,
            category
        });
    } catch (error) {
        console.error('Error saving file:', error);
        throw new Error('Failed to save image');
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    redirect('/admin/dashboard');
}

export async function deleteProductAction(formData) {
    const id = formData.get('id');
    deleteProduct(id);
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    redirect('/admin/dashboard');
}

export async function updateAboutAction(formData) {
    const bio = formData.get('bio');
    const file = formData.get('image');
    let imageUrl = formData.get('currentImageUrl');

    if (file && file.size > 0) {
        const fileName = `about-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(process.cwd(), 'public', 'images', 'uploads', fileName);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            await fs.writeFile(filePath, buffer);
            imageUrl = `/images/uploads/${fileName}`;
        } catch (error) {
            console.error('Error saving about image:', error);
        }
    }

    updateAbout({ bio, imageUrl });
    revalidatePath('/about');
    revalidatePath('/admin/dashboard');
    redirect('/admin/dashboard');
}

export async function customerSignup(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    addUser({ name, email, password, role: 'customer' });
    cookies().set('pila_customer_session', email, { httpOnly: true, path: '/' });
    revalidatePath('/');
    redirect('/');
}

export async function customerLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const user = getUser(email);

    if (user && user.password === password) {
        cookies().set('pila_customer_session', email, { httpOnly: true, path: '/' });
    } else {
        redirect('/login?error=InvalidCredentials');
    }
    revalidatePath('/');
    redirect('/');
}
