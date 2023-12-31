import Item from "../Item/Item";
import Flex from "../Flex/Flex";
import Loader from "../Loader/Loader";


function ItemList({ products, isLoading }) {
  if (isLoading) return <Loader />;

  if (products.length === 0) return <h2>No encontramos productos</h2>;

  return (
    <>
      <Flex title="Nuestros Juegos">
        {products.map((itemInArray) => (
          <Item key={products.id} {...itemInArray} />
        ))}
      </Flex>
    </>
  );
}

export default ItemList;
