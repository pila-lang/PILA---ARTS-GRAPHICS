'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import path from 'path';
import { addUser, getUser, addProduct, getProducts, deleteProduct, updateAbout, updateUser } from './data';
// import fs from 'fs/promises'; // Unused
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file) {
    if (!file || typeof file === 'string' || file.size === 0) return null;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: 'pila_arts_uploads',
        }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
        }).end(buffer);
    });
}

export async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const user = getUser(email);

    if (user && user.role === 'admin' && user.password === password) {
        const cookieStore = cookies();
        // Clear any existing customer session
        cookieStore.delete('pila_customer_session');

        cookieStore.set('pila_session', 'admin-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });

        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        redirect('/admin/dashboard');
    } else {
        redirect('/admin/login?error=true');
    }
}

export async function logout() {
    const cookieStore = cookies();

    // Clear all possible cookies
    // Aggressive cookie clearing
    cookieStore.delete('pila_session');
    cookieStore.delete('pila_customer_session');

    // Fallback for some environments
    cookieStore.set('pila_session', '', { path: '/', expires: new Date(0) });
    cookieStore.set('pila_customer_session', '', { path: '/', expires: new Date(0) });

    // Force revalidate
    revalidatePath('/');
    revalidatePath('/gallery');
    revalidatePath('/admin/dashboard');
    revalidatePath('/about');

    redirect('/');
}

export async function createProduct(formData) {
    const title = formData.get('title');
    const priceStr = formData.get('price');
    const price = parseInt(priceStr);
    const description = formData.get('description');
    const category = formData.get('category');
    const file = formData.get('image');

    if (!file || typeof file === 'string' || file.size === 0) {
        console.error('No valid file uploaded for product');
        redirect('/admin/dashboard?error=NoFile');
    }

    let success = false;
    try {
        const imageUrl = await uploadToCloudinary(file);

        if (!imageUrl) {
            throw new Error('Cloudinary upload failed');
        }

        addProduct({
            title,
            price: isNaN(price) ? 0 : price,
            description,
            imageUrl,
            category
        });
        success = true;
    } catch (error) {
        console.error('Error saving product file (Cloudinary):', error);
        // We will redirect after the catch
    }

    if (success) {
        revalidatePath('/');
        revalidatePath('/gallery');
        revalidatePath('/admin/dashboard');
        redirect('/admin/dashboard?success=true');
    } else {
        redirect('/admin/dashboard?error=UploadFailed');
    }
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
        try {
            const uploadedUrl = await uploadToCloudinary(file);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        } catch (error) {
            console.error('Error saving about image (Cloudinary):', error);
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

    const cookieStore = cookies();
    cookieStore.delete('pila_session'); // Clear admin session
    cookieStore.set('pila_customer_session', email, { httpOnly: true, path: '/' });

    revalidatePath('/');
    revalidatePath('/gallery');
    redirect('/');
}

export async function customerLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const user = getUser(email);

    if (user && user.password === password) {
        const cookieStore = cookies();
        cookieStore.delete('pila_session'); // Clear admin session
        cookieStore.set('pila_customer_session', email, { httpOnly: true, path: '/' });

        revalidatePath('/');
        revalidatePath('/gallery');
        redirect('/');
    } else {
        redirect('/login?error=InvalidCredentials');
    }
}
