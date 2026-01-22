import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchFaqs, fetchSteps } from "@/services/api";
import { Loader2 } from "lucide-react";

export default function KnowMoreTabs() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("faq");

  const { data: faqs = [] } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  const { data: steps = [], isLoading } = useQuery({
    queryKey: ["steps", activeTab],
    queryFn: () => fetchSteps(activeTab),
  });

  useEffect(() => {
    if (faqs.length > 0) {
      setActiveFaq(faqs[0].id);
    }
  }, [faqs]);
  
  const currentFaq = faqs.find((f) => f.id === activeFaq);

  const tabs = [
    { key: "faq", label: "Frequent Questions" },
    { key: "about", label: "Who we are?" },
    { key: "partner", label: "Partner Program" },
    { key: "support", label: "Help & Support" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      {/* HEADER */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold">Know more about us!</h2>

        <div className="flex flex-wrap gap-3 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-5 py-2 transition cursor-pointer
                ${
                  activeTab === tab.key
                    ? "border border-orange-500 text-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="rounded-3xl bg-white p-8 shadow">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* LEFT FAQ */}
          <div className="space-y-3">
            {faqs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => setActiveFaq(faq.id)}
                className={`w-full rounded-full px-5 py-3 text-left text-sm font-medium transition cursor-pointer
                  ${
                    activeFaq === faq.id
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {faq.question}
              </button>
            ))}
          </div>

          {/* RIGHT STEPS */}
          <div className="md:col-span-2">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {steps.map((step) => (
                    <Card
                      key={step.id}
                      className="rounded-2xl bg-gray-100 shadow-none transition hover:-translate-y-1 hover:shadow"
                    >
                      <CardContent className="flex flex-col items-center p-6 text-center cursor-pointer">
                        <div className="mb-4 text-5xl">{step.icon}</div>
                        <h3 className="mb-2 font-bold">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* ANSWER */}
                {currentFaq && (
                  <p className="mx-auto mt-6 max-w-xl text-center text-sm text-gray-600">
                    {currentFaq.answer}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
