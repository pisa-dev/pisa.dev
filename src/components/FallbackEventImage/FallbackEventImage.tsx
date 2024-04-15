import Image from 'next/image';

export const FallbackEventImage = () => (
  <div style={{
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: 'black',
  }}>
    <Image
      src='/logo2.svg'
      alt='Pisa.dev logo'
      fill={true}
    />
  </div>
);
