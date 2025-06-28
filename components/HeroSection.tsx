import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-light-100 py-16 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between">
      {/* Left Content */}
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
          Intelligent Cloud Architecting & Network Automation
        </h1>
        <p className="text-light-200 text-lg mt-4">
          AI-powered cloud automation for AWS, OpenStack, On-Prem and Hybrid
          Cloud. Deploy smarter, scale faster & manage
          effortlessly.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
          <Link href="/get-started">
            <button className="bg-[#FFD700] border border-blue-light text-[#1A73E8] px-6 py-3 rounded-lg font-semibold hover:bg-[#E76F51] transition">
              Get Started
            </button>
          </Link>
          <Link href="/learn-more">
            <button className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="mt-10 md:mt-0 w-full md:w-1/2 flex justify-center">
        <Image
          src="/images/cloudlabx-hero.png"
          alt="AI-Powered Cloud Architecture Platform"
          width={500}
          height={400}
          className="w-full md:w-auto"
        />
      </div>
    </section>
  );
}
