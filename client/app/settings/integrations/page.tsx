import type { NextPage } from "next";

const IntegrationsPage: NextPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-tf-blue-dark">
        User Integrations
      </div>

      <div className="text-sm text-gray-500">
        Manage your integrations with third-party services. Here you can see all
        active integrations and their statuses, as well as the option to
        disconnect or configure them.
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
              {/* Add icon or service image here */}
              <span className="text-lg font-semibold">GD</span>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Stripe Nexus</div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
          </div>
          <div className="text-sm text-tf-blue-dark">
            <button className="hover:text-tf-blue-light">Disconnect</button>
          </div>
        </div>

        {/* Integration Card 2 */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
              <span className="text-lg font-semibold">DB</span>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Square</div>
              <div className="text-sm text-gray-500">Inactive</div>
            </div>
          </div>
          <div className="text-sm text-tf-blue-dark">
            <button className="hover:text-tf-blue-light">Reconnect</button>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
              <span className="text-lg font-semibold">SL</span>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Dwolla</div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
          </div>
          <div className="text-sm text-tf-blue-dark">
            <button className="hover:text-tf-blue-light">Disconnect</button>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Add New Integration
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-tf-blue-dark text-white rounded-md hover:bg-tf-blue-light">
            Connect Stripe
          </button>
          <button className="px-4 py-2 bg-tf-blue-dark text-white rounded-md hover:bg-tf-blue-light">
            Connect Dwolla
          </button>
          <button className="px-4 py-2 bg-tf-blue-dark text-white rounded-md hover:bg-tf-blue-light">
            Connect Square
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
