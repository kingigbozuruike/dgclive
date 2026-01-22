// generated test page for checking Supabase and API connectivity

"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function TestPage() {
  const [supabaseStatus, setSupabaseStatus] = useState<string>("Not tested");
  const [apiStatus, setApiStatus] = useState<string>("Not tested");
  const [loading, setLoading] = useState(false);

  const testSupabase = async () => {
    setLoading(true);
    try {
      // Test Supabase connection by checking auth
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setSupabaseStatus(`❌ Error: ${error.message}`);
      } else {
        setSupabaseStatus(`✅ Connected! Session: ${data.session ? "Active" : "No active session"}`);
      }
    } catch (err) {
      setSupabaseStatus(`❌ Failed: ${err}`);
    }
    setLoading(false);
  };

  const testAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
      const data = await res.json();
      if (data.ok) {
        setApiStatus(`✅ API Connected! DB time: ${JSON.stringify(data.now)}`);
      } else {
        setApiStatus(`❌ API Error: ${data.error}`);
      }
    } catch (err) {
      setApiStatus(`❌ Failed to reach API: ${err}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">🧪 Connection Test Page</h1>
      
      <div className="space-y-6">
        {/* Supabase Test */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Supabase Connection</h2>
          <p className="text-zinc-400 mb-2">URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
          <p className="mb-4">Status: {supabaseStatus}</p>
          <button
            onClick={testSupabase}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Test Supabase
          </button>
        </div>

        {/* API Test */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Backend API Connection</h2>
          <p className="text-zinc-400 mb-2">URL: {process.env.NEXT_PUBLIC_API_URL}</p>
          <p className="mb-4">Status: {apiStatus}</p>
          <button
            onClick={testAPI}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Test API
          </button>
        </div>

        {/* Test Both */}
        <button
          onClick={() => { testSupabase(); testAPI(); }}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-lg font-semibold disabled:opacity-50"
        >
          Test All Connections
        </button>
      </div>
    </div>
  );
}
