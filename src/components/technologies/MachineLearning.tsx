import Image from 'next/image';

export default function MachineLearning() {
  return (
    <Image
      src="/skills/ML.png"
      alt="MachineLearning"
      width={24}
      height={24}
      className="size-full object-contain"
    />
  );
}
