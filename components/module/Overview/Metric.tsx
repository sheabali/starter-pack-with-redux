import { Card } from "@/components/ui/card";
import { CreditCard, DollarSign, Users } from "lucide-react";

const Metric = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Total Active Couples */}
      <Card className="w-full bg-[#f9fff8] px-4 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl text-gray-600">Total Active Couples</h3>
            <p className="text-2xl font-bold my-6">512</p>
            <p className="text-green-600 mt-1">↑ 12% from last month</p>
          </div>
          <div className="text-white p-2 bg-[#a66dd4] rounded-md">
            <Users className="text" size={36} />
          </div>
        </div>
      </Card>

      {/* Total Subscriptions */}
      <Card className="w-full bg-[#f9fff8] px-4 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl text-gray-600">Total Subscriptions</h3>
            <p className="text-2xl font-bold my-6">1,024</p>
            <p className="text-green-600 mt-1">↑ 8% from last month</p>
          </div>
          <div className="text-white p-2 bg-[#a66dd4] rounded-md">
            <CreditCard size={36} />
          </div>
        </div>
      </Card>

      {/* Monthly Revenue */}
      <Card className="w-full bg-[#f9fff8] px-4 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl text-gray-600">Monthly Revenue</h3>
            <p className="text-2xl font-bold my-6">$12,340</p>
            <p className="text-green-600 mt-1">↑ 15% from last month</p>
          </div>
          <div className="text-white p-2 bg-[#a66dd4] rounded-md">
            <DollarSign size={36} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Metric;
