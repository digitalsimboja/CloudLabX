# BojaLabs 🚀  

BojaLabs is a cloud architecting and hands-on lab platform that allows teams to design, visualize, deploy, and optimize cloud-based solutions using an interactive UI. The platform integrates AI-powered auto-segmentation, infrastructure automation (Terraform/CDK), and predictive analytics to enhance cloud deployments. 

## Features  

✅ Core Functionalities
👨‍💻 Cloud Architecture Builder: Drag-and-drop UI for designing AWS-based infrastructure.

🚀 Auto-Generated IaC (Terraform/CDK): Converts designs into deployable code.

🤖 AI-Driven Segmentation: Auto-segments cloud data, logs, and costs using ML.

📊 AI Insights & Optimization: AI suggests cost optimizations and security improvements.

🔎 Monitoring & Anomaly Detection: AI tracks deployments, detects security issues, and predicts cost trends.

👥 Team Collaboration & Multi-User Editing: Real-time updates for cloud teams.

⚙️ Integrations with AWS, GitHub, and CI/CD Pipelines: Seamless workflow automation.

🔒 Secure Access Control: IAM-based role management for cloud deployments.  

## Getting Started

### Prerequisites

1. **Chalice API Setup**: Deploy the Chalice API first (see `data-segmentation-api/README.md`)
2. **Environment Configuration**: Create a `.env.local` file with your Chalice API URL:

```bash
# Chalice API Configuration
NEXT_PUBLIC_CHALICE_API_URL=https://your-chalice-api-url.execute-api.eu-west-1.amazonaws.com/api
```

Replace the URL with your actual Chalice API Gateway URL after deployment.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
