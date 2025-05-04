import { Lightbulb, Layers, UploadCloud, RefreshCcw } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="bg-dark-900 py-16 lg:py-32">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          How TrixNet Works
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Streamline hybrid cloud orchestration with AI-powered automation.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1: AI-Powered Insights */}
          <div className="bg-dark-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center translate-y-5 animate-fade-in delay-300">
            <Lightbulb size={48} className="text-[#00B4D8] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              AI-Driven Architecture Insights
            </h3>
            <p className="text-sm text-gray-300">
              Analyze hybrid environments with intelligent recommendations for
              network design, cost optimization, and system performance across
              on-prem and cloud platforms.
            </p>
          </div>

          {/* Step 2: Intelligent Segmentation */}
          <div className="bg-dark-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center translate-y-5 animate-fade-in delay-200">
            <Layers size={48} className="text-[#F4A261] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Intelligent Workload Segmentation
            </h3>
            <p className="text-sm text-gray-300">
              Automatically segment and route workloads across on-prem,
              OpenStack, and AWS using ML-powered automation for hybrid cloud
              optimization.{" "}
            </p>
          </div>

          {/* Step 3: Cloud Deployment */}
          <div className="bg-dark-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center translate-y-5 animate-fade-in delay-400">
            <UploadCloud size={48} className="text-[#FF6F61] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Unified Infrastructure Deployment
            </h3>
            <p className="text-sm text-gray-300">
              Automate the provisioning of cloud and on-prem networks using
              pre-built templates, ensuring consistent, scalable deployments
              across all environments.{" "}
            </p>
          </div>

          {/* Step 4: Continuous Optimization */}
          <div className="bg-dark-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center translate-y-5 animate-fade-in delay-600">
            <RefreshCcw size={48} className="text-[#FFD700] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Continuous Optimization
            </h3>
            <p className="text-sm text-gray-300">
              Continuously monitor and adapt network configurations, optimizing
              performance, security, and cost across your hybrid and multi-cloud
              environments.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
