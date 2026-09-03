import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { Building2, Home, CheckCircle, IndianRupee, Users, Wrench, AlertCircle, Sparkles } from 'lucide-react';
import api from '../../services/api';
import { Loading } from '../../components/Loading';
import { formatCurrency } from '../../utils/helpers';

export const AdminOverview: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/admin/data/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (isLoading) return <Loading />;

  const { totals } = data || {};

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
            <span className="inline-flex items-center gap-1 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-primary/30">
              <Sparkles size={10} />
              HYVORA DEMO
            </span>
          </div>
          <p className="text-grey-light">Welcome back, Property Administrator</p>
        </div>
      </div>
      
      {/* KPI Cards Grid - Fictional Demo Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="flex items-center gap-4 border-l-4 border-primary hover:border-primary-light transition-all">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Building2 className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-grey-light text-xs uppercase font-medium tracking-wide">Total Properties</p>
            <p className="text-2xl font-bold text-white">{totals?.totalProperties ?? 24}</p>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4 border-l-4 border-blue-500 hover:border-blue-400 transition-all">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Home className="text-blue-500" size={24} />
          </div>
          <div>
            <p className="text-grey-light text-xs uppercase font-medium tracking-wide">Total Units</p>
            <p className="text-2xl font-bold text-white">{totals?.totalUnits ?? 186}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-amber-500 hover:border-amber-400 transition-all">
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <CheckCircle className="text-amber-500" size={24} />
          </div>
          <div>
            <p className="text-grey-light text-xs uppercase font-medium tracking-wide">Occupied Units</p>
            <p className="text-2xl font-bold text-white">{totals?.bookedProperties ?? 154}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-green-500 hover:border-green-400 transition-all">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <div>
            <p className="text-grey-light text-xs uppercase font-medium tracking-wide">Available Units</p>
            <p className="text-2xl font-bold text-white">{totals?.availableProperties ?? 32}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-emerald-400 hover:border-emerald-300 transition-all">
          <div className="p-3 bg-emerald-400/10 rounded-lg">
            <IndianRupee className="text-emerald-400" size={24} />
          </div>
          <div>
            <p className="text-grey-light text-xs uppercase font-medium tracking-wide">Monthly Revenue</p>
            <p className="text-2xl font-bold text-white">
              {totals?.monthlyRevenue ? formatCurrency(totals.monthlyRevenue) : '₹18.4L'}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-purple-500 hover:border-purple-400 transition-all">
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <Users className="text-purple-500" size={24} />
          </div>
          <div>
            <p className="text-grey-light text-xs uppercase font-medium tracking-wide">Active Tenants</p>
            <p className="text-2xl font-bold text-white">{totals?.totalTenants ?? 142}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-orange-500 hover:border-orange-400 transition-all">
          <div className="p-3 bg-orange-500/10 rounded-lg">
            <Wrench className="text-orange-500" size={24} />
          </div>
          <div>
            <p className="text-grey-light text-xs uppercase font-medium tracking-wide">Pending Maintenance</p>
            <p className="text-2xl font-bold text-white">12</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-rose-500 hover:border-rose-400 transition-all">
          <div className="p-3 bg-rose-500/10 rounded-lg">
            <AlertCircle className="text-rose-500" size={24} />
          </div>
          <div>
            <p className="text-grey-light text-xs uppercase font-medium tracking-wide">Open Complaints</p>
            <p className="text-2xl font-bold text-white">7</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Available Properties List */}
        <Card className="lg:col-span-2 mt-8">
          <h2 className="text-xl font-bold text-white mb-6">Available & Booked Properties</h2>
          {data?.availablePropertiesList && data.availablePropertiesList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-grey-dark text-grey-light text-sm">
                    <th className="pb-3 px-4">Project</th>
                    <th className="pb-3 px-4">Property Name</th>
                    <th className="pb-3 px-4">Type</th>
                    <th className="pb-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.availablePropertiesList.map((prop: any) => (
                    <tr key={prop.id} className="border-b border-dark-lighter hover:bg-dark-lighter/50">
                      <td className="py-4 px-4 font-semibold text-white">{prop.projectName}</td>
                      <td className="py-4 px-4 text-grey-light">{prop.title}</td>
                      <td className="py-4 px-4 text-grey-light capitalize">{prop.type}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          prop.status === 'available' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {prop.status?.toUpperCase() || 'UNKNOWN'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-grey-light">
              <p>No available properties found at the moment.</p>
            </div>
          )}
        </Card>

      </div>
    </div>
  );
};
