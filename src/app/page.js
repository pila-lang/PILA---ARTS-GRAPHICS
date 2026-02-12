import { getProducts } from '../lib/data';
import HomeClient from '../components/HomeClient';

export default async function HomePage() {
    const products = await getProducts();

    return <HomeClient initialProducts={products} />;
}
