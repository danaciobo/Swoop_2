import ItemList from './ItemsList';
import Banner from './Banner';
import Cart from './cart';
import Footer from './Footer';

export default function Home({ items }) {

  return (

    <div className='homePage'>
      <Banner />
      <ItemList items={items} />
      <Cart />
      <Footer />
    </div>

  );
}