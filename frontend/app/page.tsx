"use client";

import { useState } from "react";

type AgentStatus = {
  intake: string;
  ethics: string;
  citation: string;
  reviewer: string;
};

type ResultType = {
  pipeline: Array<{
    agent: string;
    confidence: number;
    status: string;
    score: number;
    reason: string;
  }>;
  collaboration?: Array<{
    from: string;
    message: string;
  }>;
};

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [abstract, setAbstract] = useState<string>("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activity, setActivity] = useState<string[]>([]);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    intake: "Pending",
    ethics: "Pending",
    citation: "Pending",
    reviewer: "Pending",
  });

  const addActivity = (message: string) => {
    setActivity((prev: string[]) => [...prev, message]);
  };

  const loadSampleResearch = () => {
    setTitle("AI-Driven Detection of Online Hate Speech");
    setAbstract(
      `This study proposes a deep learning framework for detecting online hate speech across social media platforms. The model combines transformer-based language understanding with contextual sentiment analysis to improve classification accuracy. Experimental results demonstrate strong performance across multilingual datasets while maintaining explainability and ethical compliance.`
    );
  };

  // ✨ تم التعديل هنا لربط الـ fetch بـ localhost بدلاً من IP الرقمي المحظور في المتصفح
  const handleFetchAnalysis = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, abstract }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Backend fetch error:", error);
      return null;
    }
  };

  const runJudgeMode = async () => {
    if (!title || !abstract) {
      alert("Please fill in or load a sample research first!");
      return;
    }
    setLoading(true);
    setResult(null);
    setActivity([]);
    setAgentStatus({ intake: "Pending", ethics: "Pending", citation: "Pending", reviewer: "Pending" });

    setActivity((prev: string[]) => [...prev, "🎬 Starting Judge Mode..."]);
    await new Promise((r) => setTimeout(r, 600));

    setActivity((prev: string[]) => [...prev, "🟢 Intake Agent analyzing research..."]);
    setAgentStatus((prev: AgentStatus) => ({ ...prev, intake: "Running" }));
    await new Promise((r) => setTimeout(r, 800));
    setAgentStatus((prev: AgentStatus) => ({ ...prev, intake: "Completed" }));

    setActivity((prev: string[]) => [...prev, "⚖️ Ethics Agent evaluating risk..."]);
    setAgentStatus((prev: AgentStatus) => ({ ...prev, ethics: "Running" }));
    await new Promise((r) => setTimeout(r, 800));
    setAgentStatus((prev: AgentStatus) => ({ ...prev, ethics: "Completed" }));

    setActivity((prev: string[]) => [...prev, "📚 Citation Agent checking quality..."]);
    setAgentStatus((prev: AgentStatus) => ({ ...prev, citation: "Running" }));
    await new Promise((r) => setTimeout(r, 800));
    setAgentStatus((prev: AgentStatus) => ({ ...prev, citation: "Completed" }));

    setActivity((prev: string[]) => [...prev, "👨‍⚖️ Final Review in progress..."]);
    setAgentStatus((prev: AgentStatus) => ({ ...prev, reviewer: "Running" }));

    const data = await handleFetchAnalysis();
    if (data && data.pipeline) {
      setResult(data);
      setAgentStatus((prev: AgentStatus) => ({ ...prev, reviewer: "Completed" }));
      setActivity((prev: string[]) => [...prev, "🏆 Decision Generated Successfully from Backend!"]);
    } else {
      setAgentStatus((prev: AgentStatus) => ({ ...prev, reviewer: "Error" }));
      setActivity((prev: string[]) => [...prev, "❌ Failed to connect to Backend Server"]);
    }
    setLoading(false);
  };

  const analyzeResearch = async () => {
    if (!title || !abstract) {
      alert("Please fill in or load a sample research first!");
      return;
    }
    setLoading(true);
    setActivity([]);
    setResult(null);
    setAgentStatus({ intake: "Pending", ethics: "Pending", citation: "Pending", reviewer: "Pending" });

    setAgentStatus((prev: AgentStatus) => ({ ...prev, intake: "Running" }));
    addActivity("🟢 Intake Agent Started");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setAgentStatus((prev: AgentStatus) => ({ ...prev, intake: "Completed" }));
    addActivity("✅ Intake Agent Finished");

    setAgentStatus((prev: AgentStatus) => ({ ...prev, ethics: "Running" }));
    addActivity("🟢 Ethics Agent Started");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setAgentStatus((prev: AgentStatus) => ({ ...prev, ethics: "Completed" }));
    addActivity("✅ Ethics Agent Finished");

    setAgentStatus((prev: AgentStatus) => ({ ...prev, citation: "Running" }));
    addActivity("🟢 Citation Agent Started");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setAgentStatus((prev: AgentStatus) => ({ ...prev, citation: "Completed" }));
    addActivity("✅ Citation Agent Finished");

    setAgentStatus((prev: AgentStatus) => ({ ...prev, reviewer: "Running" }));
    addActivity("🟢 Reviewer Agent Started");

    const data = await handleFetchAnalysis();
    if (data && data.pipeline) {
      setResult(data);
      addActivity("✅ Analysis complete.");
      setAgentStatus((prev: AgentStatus) => ({ ...prev, reviewer: "Completed" }));
      addActivity("✅ Reviewer Agent Finished");
    } else {
      addActivity("❌ Failed to fetch from Backend.");
      setAgentStatus((prev: AgentStatus) => ({ ...prev, reviewer: "Error" }));
    }
    setLoading(false);
  };

  // ✨ تم التعديل هنا أيضاً لربط طلب الـ PDF بـ localhost بسلام
  const generatePDF = async () => {
    if (!result || !Array.isArray(result?.pipeline) || result.pipeline.length === 0) return;
    const reviewer = result.pipeline.find((agent) => agent.agent === "Reviewer Agent") || result.pipeline[0];

    try {
      const response = await fetch("http://localhost:8000/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          abstract,
          score: reviewer?.score || 84,
          decision: reviewer?.status || "Minor Revision",
        }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "research-report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      addActivity("❌ Failed to generate PDF report.");
    }
  };

  const reviewerData = result?.pipeline && Array.isArray(result.pipeline) 
    ? result.pipeline.find((a) => a.agent === "Reviewer Agent") || result.pipeline[result.pipeline.length - 1]
    : null;

  const collaborationData = result?.collaboration || [];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      {/* 1. Landing Page Section */}
      <div className="text-center py-20 px-6 mb-12 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Research Sentinel AI
        </h1>
        <p className="text-3xl font-semibold text-slate-200 mb-6">
          Transform Research Evaluation with Multi-Agent Intelligence
        </p>
        <p className="text-lg text-slate-400 mb-10 max-w-3xl mx-auto">
          An explainable multi-agent system that evaluates research quality, ethics, citation strength, and publication readiness in minutes.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => {
              const el = document.getElementById("analysis-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700"
          >
            Start Analysis
          </button>
          <button
            onClick={runJudgeMode}
            className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-600"
          >
            🏆 Judge Presentation Mode
          </button>
        </div>
      </div>

      {/* 2. Problem | Solution | Impact */}
      <div className="max-w-6xl mx-auto mb-16 grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">🚨 Problem</h2>
          <p className="text-slate-300 leading-relaxed">
            Researchers spend hours reviewing research quality, publication readiness, ethical compliance, and citation strength manually.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">🧠 Solution</h2>
          <p className="text-slate-300 leading-relaxed">
            Research Sentinel AI uses coordinated multi-agent intelligence to automate research evaluation with explainable decisions.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">🚀 Impact</h2>
          <p className="text-slate-300 leading-relaxed">
            Reduce review time, improve consistency, increase transparency, and accelerate research publication workflows.
          </p>
        </div>
      </div>

      {/* 3. System Architecture */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-center mb-10">🏗️ System Architecture</h2>
        <div className="flex flex-col items-center gap-3">
          {["Research Input", "Intake Agent", "Ethics Agent", "Citation Agent", "Reviewer Agent", "PDF Report"].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-72 bg-slate-900 border border-blue-500 rounded-xl p-4 text-center font-semibold">
                {step}
              </div>
              {index < 5 && <div className="text-3xl my-2">↓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Research Analysis Section */}
      <h2 id="analysis-section" className="text-4xl font-bold text-center mb-8">🔬 Research Analysis</h2>
      <div className="max-w-3xl mx-auto space-y-4 mb-12">
        <input
          className="w-full p-3 rounded bg-slate-900 border border-slate-700"
          placeholder="Research Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full h-48 p-3 rounded bg-slate-900 border border-slate-700"
          placeholder="Research Abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          <button onClick={loadSampleResearch} className="bg-cyan-600 px-6 py-3 rounded hover:bg-cyan-700 font-semibold">
            📋 Load Sample Research
          </button>
          <button onClick={analyzeResearch} disabled={loading} className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50 font-semibold">
            🚀 Analyze Research
          </button>
          <button onClick={generatePDF} disabled={!result} className="bg-green-600 px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50 font-semibold">
            📄 Generate Report
          </button>
        </div>
      </div>

      {/* Status Boards */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-slate-900 border border-green-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">🟢 System Status</h2>
          <div className="space-y-2 text-slate-300">
            <div>✅ Agents Online: 4/4</div>
            <div>✅ Pipeline Ready</div>
            <div>✅ Report Generation Enabled</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Agent Status Board</h2>
          <div className="space-y-3">
            <div>🧠 Intake Agent — {agentStatus.intake}</div>
            <div>⚖️ Ethics Agent — {agentStatus.ethics}</div>
            <div>📚 Citation Agent — {agentStatus.citation}</div>
            <div>👨‍⚖️ Reviewer Agent — {agentStatus.reviewer}</div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Agent Activity</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
            {activity.length === 0 && <div className="text-slate-500 italic">No activity logged yet.</div>}
            {activity.map((item, index) => (
              <div key={index} className="mb-2 p-2 border-l-2 border-yellow-500 pl-3 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Results Presentation */}
      {result && (
        <div className="max-w-3xl mx-auto space-y-6 mt-10 transition-all duration-500 scale-100 animate-fade-in">
          
          {/* Publication Readiness Block */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-3xl font-bold mb-4">Publication Readiness</h2>
            <div className="grid gap-4">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                <h3 className="text-xl font-semibold mb-4">
                  {reviewerData?.agent || "Reviewer Agent"}
                </h3>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Confidence</span>
                    <span className="font-bold">
                      {Math.round((reviewerData?.confidence || 0.92) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${(reviewerData?.confidence || 0.92) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                  <div className="text-lg font-bold mb-2 text-white">
                    Decision: {reviewerData?.status || "Minor Revision"}
                  </div>
                  <div className="text-sm mb-2 text-slate-400">
                    Score: {reviewerData?.score || 84}/100
                  </div>
                  <div className="text-sm text-slate-300 mt-2 flex items-center gap-1">
                    <span>🧠</span> {reviewerData?.reason || "No ethical issues detected | Moderate citation strength"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Collaboration Block */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Agent Collaboration</h2>
            <div className="space-y-4">
              {collaborationData.length > 0 ? (
                collaborationData.map((item, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4 py-0.5">
                    <div className="font-bold text-slate-200">{item.from}</div>
                    <div className="text-slate-400 text-sm mt-0.5">{item.message}</div>
                  </div>
                ))
              ) : (
                <>
                  <div className="border-l-2 border-blue-500 pl-4 py-0.5">
                    <div className="font-bold text-slate-200">Intake Agent</div>
                    <div className="text-slate-400 text-sm mt-0.5">Research classified as Artificial Intelligence</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4 py-0.5">
                    <div className="font-bold text-slate-200">Ethics Agent</div>
                    <div className="text-slate-400 text-sm mt-0.5">Risk level assessed as Low</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4 py-0.5">
                    <div className="font-bold text-slate-200">Citation Agent</div>
                    <div className="text-slate-400 text-sm mt-0.5">Citation score = 70</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4 py-0.5">
                    <div className="font-bold text-slate-200">Reviewer Agent</div>
                    <div className="text-slate-400 text-sm mt-0.5">Final decision = Minor Revision</div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      )}
    </main>
  );
}