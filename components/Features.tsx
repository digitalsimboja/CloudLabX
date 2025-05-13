import { Cpu, BarChart, Cloud, Settings } from "lucide-react";

export default function Features() {
  return (
    <section className="py-16 lg:py-32 bg-light-100">
      <div className="mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-dark-100">
          Key Features of BojaLabs
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-dark-200 max-w-3xl mx-auto">
          Empowering teams with AI-driven hybrid cloud orchestration and
          automation to reduce costs and boost efficiency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Hybrid Workload Automation */}
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center">
            <Cpu size={48} className="text-[#00B4D8] mb-4" />
            <h3 className="text-xl font-semibold text-dark-100 mb-2">
              Hybrid Workload Automation
            </h3>
            <p className="text-sm text-dark-200">
              Seamlessly automate workloads across on-prem, AWS, and OpenStack
              environments, ensuring smooth deployment, scaling, and performance
              without manual intervention.
            </p>
          </div>

          {/* Feature 2: AI-Driven Optimization */}
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center transition-opacity duration-500 delay-200 opacity-100">
            <Settings size={48} className="text-[#F4A261] mb-4" />
            <h3 className="text-xl font-semibold text-dark-100 mb-2">
              AI-Driven Optimization
            </h3>
            <p className="text-sm text-dark-200">
              Leverage machine learning models to detect inefficiencies, balance
              resources, and deliver continuous optimization across hybrid cloud
              and network layers.
            </p>
          </div>

          {/* Feature 3: Unified Monitoring & Alerts */}
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center">
            <Cloud size={48} className="text-[#FF6F61] mb-4" />
            <h3 className="text-xl font-semibold text-dark-100 mb-2">
              Monitoring & Alerts
            </h3>
            <p className="text-sm text-dark-200">
              Gain real-time visibility across all cloud and on-prem assets with
              unified dashboards and intelligent alerting to catch issues before
              they impact operations.
            </p>
          </div>

          {/* Feature 4: Advanced Analytics Dashboard */}
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center">
            <BarChart size={48} className="text-[#FFD700] mb-4" />
            <h3 className="text-xl font-semibold text-dark-100 mb-2">
              Advanced Analytics Dashboard
            </h3>
            <p className="text-sm text-dark-200">
              Visualize hybrid cloud performance, network metrics, and
              cost-saving opportunities with a centralized dashboard that
              delivers actionable insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
