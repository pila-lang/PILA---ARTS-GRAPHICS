'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import path from 'path';
import { addUser, getUser, addProduct, getProducts, deleteProduct, updateAbout, updateUser } from './data';
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
    const cookieStore = cookies();

    // Explicitly clear both session cookies with common options
    cookieStore.set('pila_session', '', { path: '/', expires: new Date(0), maxAge: 0 });
    cookieStore.set('pila_customer_session', '', { path: '/', expires: new Date(0), maxAge: 0 });

    // Also use the delete method for good measure
    cookieStore.delete('pila_session');
    cookieStore.delete('pila_customer_session');

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

    // Check if a new file was actually uploaded
    if (file && typeof file !== 'string' && file.size > 0) {
        // Safe filename: remove non-alphanumeric except dots/dashes
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `about-${Date.now()}-${safeName}`;
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

    // Update the about section
    updateAbout({ bio, imageUrl });

    // Sync admin profile picture
    const adminEmail = 'admin@pilaarts.com';
    updateUser(adminEmail, { profilePic: imageUrl });

    // Revalidate and redirect
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/dashboard');

    // Force a redirect to ensure state is refreshed
    redirect('/admin/dashboard?updated=true');
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
