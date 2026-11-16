import Image from 'next/image';

export default function GCP() {
  return (
    <Image
      src="/skills/GCP.png"
      alt="GCP"
      width={24}
      height={24}
      className="size-full object-contain"
    />
  );
}
