import { Lightbulb, Layers, UploadCloud, RefreshCcw } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="bg-dark-900 py-16 lg:py-32">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-10">
          How CloudLabX Works
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
        CloudLabX simplifies complex infrastructure provisioning across both OpenStack and AWS. From AI-powered cloud cost insights to seamless deployment and ongoing optimization, we help you launch, scale, and manage cloud-native workloads effortlessly.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1: AI-Powered Insights */}
          <div className="bg-dark-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center translate-y-5 animate-fade-in delay-300">
            <Lightbulb size={48} className="text-[#00B4D8] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              AI-Powered Cost Insights
            </h3>
            <p className="text-sm text-gray-300">
            Our intelligent engine analyzes both AWS and OpenStack environments to detect bottlenecks, recommend cost savings, and surface architecture improvements.
            </p>
          </div>

          {/* Step 2: Intelligent Segmentation */}
          <div className="bg-dark-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center translate-y-5 animate-fade-in delay-200">
            <Layers size={48} className="text-[#F4A261] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Intelligent Segmentation
            </h3>
            <p className="text-sm text-gray-300">
            Automatically segments workloads and user data across cloud platforms using ML models tailored for hybrid infrastructure.
            </p>
          </div>

          {/* Step 3: Cloud Deployment */}
          <div className="bg-dark-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center translate-y-5 animate-fade-in delay-400">
            <UploadCloud size={48} className="text-[#FF6F61] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
            Unified Cloud Deployment
            </h3>
            <p className="text-sm text-gray-300">
            Provision infrastructure on OpenStack or AWS in one click — with pre-validated templates and zero guesswork.
            </p>
          </div>

          {/* Step 4: Continuous Optimization */}
          <div className="bg-dark-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center translate-y-5 animate-fade-in delay-600">
            <RefreshCcw size={48} className="text-[#FFD700] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Continuous Optimization
            </h3>
            <p className="text-sm text-gray-300">
            Our system continuously adapts to workload patterns, ensuring top-tier performance and cost efficiency across both cloud platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
