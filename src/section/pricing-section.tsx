"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Zap, Shield, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")



  // Calculate yearly discount (20%)
  const getYearlyPrice = (monthlyPrice: number) => {
    return (monthlyPrice * 12 * 0.8).toFixed(0)
  }

  const plans = [
    {
      name: "Free",
      description: "Perfect for individuals just getting started",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        { name: "Up to 3 communities", included: true },
        { name: "Basic analytics", included: true },
        { name: "Up to 1,000 members", included: true },
        { name: "Community discussions", included: true },
        { name: "Email support", included: true },
        { name: "Custom branding", included: false },
        { name: "API access", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Priority support", included: false },
      ],
      cta: "Get Started",
      color: "gray",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing communities with advanced needs",
      price: {
        monthly: 29,
        yearly: 278,
      },
      features: [
        { name: "Unlimited communities", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Up to 10,000 members", included: true },
        { name: "Community discussions", included: true },
        { name: "Priority email support", included: true },
        { name: "Custom branding", included: true },
        { name: "API access", included: true },
        { name: "Single sign-on (SSO)", included: false },
        { name: "Dedicated success manager", included: false },
      ],
      cta: "Start Free Trial",
      color: "sky",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom requirements",
      price: {
        monthly: 99,
        yearly: 948,
      },
      features: [
        { name: "Unlimited communities", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Unlimited members", included: true },
        { name: "Community discussions", included: true },
        { name: "24/7 phone & email support", included: true },
        { name: "Custom branding", included: true },
        { name: "API access", included: true },
        { name: "Single sign-on (SSO)", included: true },
        { name: "Dedicated success manager", included: true },
      ],
      cta: "Contact Sales",
      color: "purple",
      popular: false,
    },
  ]

  const features = [
    {
      icon: <Users className="h-5 w-5" />,
      name: "Community Management",
      description: "Tools to grow and manage your community effectively",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      name: "Security & Privacy",
      description: "Enterprise-grade security and data protection",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      name: "Performance",
      description: "Lightning-fast loading times and reliable uptime",
    },
  ]

  return (
    <section className="py-12 bg-white :bg-[#1a1d29] overflow-hidden relative" id="pricing">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-sky-500/5 :bg-sky-500/10 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-[#6E1FED]/5 :bg-[#6E1FED]/10 blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
         
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 :text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 :text-gray-300">
            Choose the perfect plan for your community needs. No hidden fees or surprises.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 :bg-[#282c3d] p-1.5 rounded-full flex items-center">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-white :bg-[#1e2130] text-gray-900 :text-white shadow-sm"
                  : "text-gray-600 :text-gray-300 hover:text-gray-900 :hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-white :bg-[#1e2130] text-gray-900 :text-white shadow-sm"
                  : "text-gray-600 :text-gray-300 hover:text-gray-900 :hover:text-white"
              }`}
            >
              Yearly
              <span className="ml-1 text-xs font-normal text-sky-600">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 z-[20] flex justify-center">
                  <div className="bg-sky-500 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`h-full bg-white :bg-[#282c3d] rounded-2xl shadow-lg :shadow-none border ${
                  plan.popular ? "border-sky-500 :border-sky-500" : "border-gray-100 :border-gray-700/30"
                } overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-sky-500/50`}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 :text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-600 :text-gray-300 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={billingCycle}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline"
                      >
                        <span className="text-4xl font-bold text-gray-900 :text-white">
                          ${billingCycle === "monthly" ? plan.price.monthly : getYearlyPrice(plan.price.monthly)}
                        </span>
                        <span className="text-gray-500 :text-gray-400 ml-2">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    {billingCycle === "yearly" && plan.price.monthly > 0 && (
                      <p className="text-sky-600 text-sm mt-2">Save ${plan.price.monthly * 12 * 0.2} per year</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-900 :text-white mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          {feature.included ? (
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-500/10 flex items-center justify-center mr-3 mt-0.5">
                              <Check className="h-3 w-3 text-sky-600" />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 :bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                              <X className="h-3 w-3 text-gray-400 :text-gray-500" />
                            </div>
                          )}
                          <span
                            className={
                              feature.included ? "text-gray-700 :text-gray-300" : "text-gray-400 :text-gray-500"
                            }
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-br from-sky-500 to-sky-700 text-white"
                        : "bg-gray-100  text-gray-900"
                    } group`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features highlight */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 :text-white mb-4">All Plans Include</h3>
            <p className="text-gray-600 :text-gray-300">
              Every plan comes with these essential features to ensure your community thrives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white :bg-[#282c3d] p-6 rounded-xl shadow-sm :shadow-none border border-gray-100 :border-gray-700/30"
              >
                <div className="p-3 rounded-full bg-sky-500/10 w-fit mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 :text-white mb-2">{feature.name}</h4>
                <p className="text-gray-600 :text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

     

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-gradient-to-br from-sky-500  to-sky-700 rounded-3xl overflow-hidden"
        >
          <div className="px-8 py-16 md:p-16 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Need a custom solution?</h3>
              <p className="text-lg opacity-90 mb-8">
                Our Enterprise plan can be tailored to your organization's specific requirements. Get in touch with our
                sales team to discuss your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-sky-600 hover:bg-gray-100">Schedule a Demo</Button>
                <Button variant="outline" className="border-white text-white bg-transparant ">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
