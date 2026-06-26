import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";

import EariningChart from "../components/EariningChart";
const Dashboard = () => {
  const { user, accessToken, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [authLoading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-surface flex items-center justify-center">
        <p className="text-text-muted">Loading Dashboard...</p>
      </div>
    );
  }
  const statCards = [
    { label: "Completed Projects", value: stats?.totalProjects || 0 },
    {
      label: "Total Earning",
      value: `$${stats?.totalEarnings?.toLocaleString() || 0}`,
    },
    {
      label: "Last Month Earnings",
      value: `$${stats?.lastMonthEarnings?.toLocaleString() || 0}`,
    },
  ];
  return (
    <div className="relative min-h-screen bg-bg-surface text-text-primary pt-28 pb-12 px-4">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-brand-glow/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-8 relative z-10 w-full">
        <div className="text-left">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
            Welcom back, {user?.username || "Freelancer"}
          </h1>
          <p className="text-text-muted text-xs md:text-sm mt-1">
            Here is what's happening with your workspace today.
          </p>
        </div>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {statCards.map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl">
              <p className="text-sm font-mono uppercase tracking-wider text-text-muted">
                {stat.label}
              </p>
              <p className="text-2xl md:text-3xl font-light font-mono mt-2 text-text-primary">
                {stat.value}
              </p>
            </div>
          ))}
        </section>
        {stats?.graphData?.length > 0 && (
    <EariningChart data={stats.graphData} />
)}
      </div>
    </div>
  );
};

export default Dashboard;
