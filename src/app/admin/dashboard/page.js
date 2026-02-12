import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProducts, getAbout } from '@/lib/data';
import { createProduct, logout, deleteProductAction, updateAboutAction } from '@/lib/actions';

export default async function AdminDashboard() {
    const session = cookies().get('pila_session');

    if (!session) {
        redirect('/admin/login');
    }

    const products = await getProducts();
    const about = await getAbout();

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1>Admin Dashboard</h1>
                <form action={logout}>
                    <button type="submit" className="btn btn-secondary">Logout</button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '40px', alignItems: 'start' }}>

                {/* Left Column: Management Forms */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'sticky', top: '20px' }}>

                    {/* Upload Product Form */}
                    <div className="glass-panel" style={{ padding: '30px' }}>
                        <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Add New Art</h2>
                        <form action={createProduct} encType="multipart/form-data">
                            <div style={{ marginBottom: '15px' }}>
                                <label>Title</label>
                                <input type="text" name="title" required />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Price (Rs.)</label>
                                <input type="number" name="price" required min="0" step="0.01" />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Category</label>
                                <select name="category" required>
                                    <option value="Nature">Nature</option>
                                    <option value="Animal">Animal</option>
                                    <option value="Locations">Locations</option>
                                    <option value="Graphics">Graphics</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Description</label>
                                <textarea name="description" rows="3" required></textarea>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label>Artwork Image</label>
                                <input type="file" name="image" accept="image/*" required />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Upload Product</button>
                        </form>
                    </div>

                    {/* Manage About Me Form */}
                    <div className="glass-panel" style={{ padding: '30px', border: '1px solid var(--secondary)' }}>
                        <h2 style={{ marginBottom: '20px', color: 'var(--secondary)' }}>Manage About Me</h2>
                        <form action={updateAboutAction} encType="multipart/form-data">
                            <input type="hidden" name="currentImageUrl" value={about.imageUrl || ''} />
                            <div style={{ marginBottom: '15px' }}>
                                <label>Bio / Description</label>
                                <textarea name="bio" rows="5" required defaultValue={about.bio}></textarea>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label>Portrait Image</label>
                                {about.imageUrl && (
                                    <div style={{ marginBottom: '10px' }}>
                                        <img src={about.imageUrl} alt="Current Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <input type="file" name="image" accept="image/*" />
                                <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '5px' }}>Leave empty to keep current image</p>
                            </div>
                            <button type="submit" className="btn btn-secondary" style={{ width: '100%', borderColor: 'var(--secondary)', color: 'white' }}>Update About Me</button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Inventory List */}
                <div>
                    <h2 style={{ marginBottom: '20px' }}>Current Inventory</h2>
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {products.map((product) => (
                            <div key={product.id} className="glass-panel" style={{ display: 'flex', padding: '15px', gap: '20px', alignItems: 'center' }}>
                                <div style={{ width: '80px', height: '80px', position: 'relative', flexShrink: 0 }}>
                                    <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ marginBottom: '4px' }}>{product.title}</h4>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', background: 'rgba(0,255,187,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                            {product.category || 'Uncategorized'}
                                        </span>
                                        <p style={{ fontWeight: 'bold' }}>Rs. {product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <form action={deleteProductAction}>
                                        <input type="hidden" name="id" value={product.id} />
                                        <button type="submit" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem', border: '1px solid #ff4444', color: '#ff4444' }}>Delete</button>
                                    </form>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && <p>No products yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
