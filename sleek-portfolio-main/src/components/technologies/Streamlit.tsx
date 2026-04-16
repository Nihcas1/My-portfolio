import Image from 'next/image';

export default function Streamlit() {
  return (
    <Image
      src="/skills/Streamlit.png"
      alt="Streamlit"
      width={24}
      height={24}
      className="size-full object-contain"
    />
  );
}
