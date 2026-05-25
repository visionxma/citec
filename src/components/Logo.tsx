import Image from "next/image";

export function Logo({ className = "", variant = "white" }: { className?: string; variant?: "white" | "color" }) {
  const src = variant === "white" ? "/logos/citec-white.png" : "/logos/citec-color.png";
  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src={src}
        alt="CITEC"
        width={140}
        height={48}
        priority
        className="h-10 w-auto object-contain"
      />
    </div>
  );
}
