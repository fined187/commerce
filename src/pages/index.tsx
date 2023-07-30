import {Inter} from 'next/font/google';
import {useEffect, useRef, useState} from 'react';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [products, setProducts] = useState<
  //   {id: string; properties: {id: string}[]}[]
  // >([]);

  const [products, setProducts] = useState<
    {id: string; name: string; createdAt: string}[]
  >([]);

  // useEffect(() => {
  //   fetch(`/api/get-items`)
  //     .then(res => res.json())
  //     .then(data => setProducts(data.message));
  // }, []);

  useEffect(() => {
    fetch(`/api/get-products`)
      .then(res => res.json())
      .then(data => setProducts(data.items));
  }, []);

  const handleClick = () => {
    if (inputRef.current == null || inputRef.current.value === '') {
      alert('name을 넣어주세요.');
      return;
    }
    fetch(`/api/add-item?name=${inputRef.current.value}`)
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <input ref={inputRef} type="text" placeholder="name" />
      <button onClick={handleClick}>Add Jacket</button>
      <div>
        <p>Product List</p>
        {
          products &&
            products.map(item => (
              <div key={item.id}>
                {item.name}
                <p>{item.createdAt}</p>
              </div>
            ))
          /* {products &&
          products.map(item => (
            <div key={item.id}>
              {JSON.stringify(item)}
              {item.properties &&
                Object.entries(item.properties).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      fetch(
                        `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`,
                      )
                        .then(res => res.json())
                        .then(data => alert(JSON.stringify(data.detail)));
                    }}
                  >
                    {key}
                  </button>
                ))}
            </div>
          ))} */
        }
      </div>
    </main>
  );
}
