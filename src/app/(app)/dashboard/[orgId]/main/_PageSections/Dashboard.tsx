import SummaryCard from './SummaryCard';
import { Icons } from '@/components/Icons';
import ComposeChart from '../../_PageSections/charts/Compose';
import BarChart from '../../_PageSections/charts/Bar';
import PieChart from '../../_PageSections/charts/Pie';
import { RecentSales } from '../../_PageSections/RecentSales';
import { DocShare } from '../../_PageSections/DocShare';
import { DashboardHeader } from '../../_PageSections/DashboardHeader';
import { ScoreCard } from '../../_PageSections/ScoreCard';
import { ModuleList } from '../../_PageSections/ModuleList';
import { ScanHistory } from '../../_PageSections/ScanHistory';
import { ClientQuickActions } from '../../_PageSections/ClientQuickActions';

const Dashboard = () => {
  return (
    <div className="w-11/12 space-y-6">
      <DashboardHeader 
  name="My Dashboard"
  status="Corrigé"
  lastScan={new Date()} 
/>
<ScoreCard 
  score={85} 
  diff={5} 
  metrics={{ accuracy: 92, speed: 88 }} 
/>
<ModuleList
  modules={[
    { name: "Analyse syntaxique", score: 85 },
    { name: "Sécurité", score: 92 },
    { name: "Performance", score: 76 },
  ]}
/>
<ScanHistory
  history={[
    {
      date: new Date("2024-04-01T10:00:00"),
      type: "Scan antivirus",
      scoreBefore: 75,
      scoreAfter: 90,
    },
    {
      date: new Date("2024-04-15T14:30:00"),
      type: "Audit sécurité",
      scoreBefore: 90,
      scoreAfter: 93,
    },
  ]}
/>

<ClientQuickActions />
    </div>
  );
};

export default Dashboard;
