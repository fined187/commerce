import {useState} from 'react';
import Carousel from 'nuka-carousel';
import Image from 'next/image';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

export default function Products() {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Carousel
        animation="zoom"
        autoplay
        withoutControls={true}
        wrapAround
        speed={100}
        slideIndex={index}
      >
        {images.map(item => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
            layout="responsive"
          />
        ))}
      </Carousel>
      <div
        style={{
          display: 'flex',
        }}
      >
        {images.map((item, idx) => (
          <div key={idx} onClick={() => setIndex(idx)}>
            <Image src={item.original} alt="image" width={100} height={60} />
          </div>
        ))}
      </div>
    </>
  );
}
