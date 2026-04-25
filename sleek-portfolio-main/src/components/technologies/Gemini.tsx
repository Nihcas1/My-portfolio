import Image from 'next/image';

export default function Gemini() {
  return (
    <Image
      src="/skills/Gemini.png"
      alt="Gemini"
      width={24}
      height={24}
      className="size-full object-contain"
    />
  );
}
