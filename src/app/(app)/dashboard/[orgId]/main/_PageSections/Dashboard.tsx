"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BackButton } from "@/components/ui/back-button";

type Blueprint = {
  id: string;
  name: string;
  createdAt: string;
};

const Dashboard = () => {
  const params = useParams();
  console.log("🧩 Params Dashboard :", params); // 👈 Ajoute ce log pour debug
  const organizationId = (params?.organizationId || params?.orgId) as string;

  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizationId) return;

    const fetchBlueprints = async () => {
      try {
        const res = await fetch(`/api/blueprints?organizationId=${organizationId}`);
        const data = await res.json();
        setBlueprints(data.blueprints || []);
      } catch (err) {
        console.error("❌ Erreur récupération blueprints", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlueprints();
  }, [organizationId]);

  if (loading) return <p>Chargement du dashboard...</p>;

  if (blueprints.length === 0) {
    return (
      <div className="p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold">Aucun Blueprint détecté</h2>
        <p className="text-gray-500">
          Connecte ton projet Unreal et utilise notre plugin pour importer ton premier Blueprint.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Blueprints détectés ({blueprints.length})</h2>
      <ul className="space-y-2">
  {blueprints.map((bp) => (
    <li key={bp.id} className="border p-3 rounded hover:bg-muted">
    <Link href={`/dashboard/${organizationId}/main/${bp.id}`}>
      <strong>{bp.name}</strong> — {new Date(bp.createdAt).toLocaleString()}
    </Link>
  </li>
  ))}
</ul>
    </div>
  );
};

export default Dashboard;
