
import { Cpu, BarChart, Cloud, Settings } from "lucide-react";

export default function Features() {
  return (
    <section className="py-16 lg:py-32 bg-light-100">
      <div className=" mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-dark-100">
          Key Features of CloudLabX
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-dark-200 max-w-3xl mx-auto">
          Discover how CloudLabX leverages cutting-edge AI to automate cloud
          optimization, workload segmentation, and more, with a focus on cost reduction,
          performance monitoring, and continuous improvement.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Auto-Segmentation */}
          <div className=" rounded-lg shadow-lg p-6 flex flex-col items-center">
            <Cpu size={48} className="text-[#00B4D8] mb-4" />
            <h3 className="text-xl font-semibold text-dark-100 mb-2">
              AI-Powered Auto-Segmentation
            </h3>
            <p className="text-sm text-dark-200">
              Automatically segment workloads and optimize cloud resources based
              on AI-driven insights, making resource allocation smarter and more
              efficient.
            </p>
          </div>

          {/* Feature 2: AI Optimization */}
          <div className=" rounded-lg shadow-lg p-6 flex flex-col items-center transition-opacity duration-500 delay-200 opacity-100">
            <Settings size={48} className="text-[#F4A261] mb-4" />
            <h3 className="text-xl font-semibold text-dark-100 mb-2">
              AI Optimization
            </h3>
            <p className="text-sm text-dark-200">
              Fine-tune your cloud infrastructure with machine learning-powered
              optimization, reducing inefficiencies and improving performance
              over time.
            </p>
          </div>

          {/* Feature 3: Monitoring & Alerts */}
          <div
            className=" rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <Cloud size={48} className="text-[#FF6F61] mb-4" />
            <h3 className="text-xl font-semibold text-dark-100 mb-2">Comprehensive Monitoring</h3>
            <p className="text-sm text-dark-200">
              Real-time monitoring of cloud infrastructure with custom alerts, ensuring you're always aware of performance bottlenecks and inefficiencies.
            </p>
          </div>

          {/* Feature 4: Analytics Dashboard */}
          <div
            className="rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <BarChart size={48} className="text-[#FFD700] mb-4" />
            <h3 className="text-xl font-semibold text-dark-100 mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-dark-200">
              Visualize cloud performance with a powerful analytics dashboard that presents actionable insights, helping you make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
