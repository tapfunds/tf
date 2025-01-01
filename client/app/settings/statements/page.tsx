import type { NextPage } from "next";

const StatementsPage: NextPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-tf-blue-dark">
        User Transfer Statements
      </div>

      <div className="text-sm text-gray-500">
        Here you can view all your completed transfer statements. Each record
        shows the transaction date, amount, sender, receiver, and current
        status.
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Recent Transfer Statements
        </div>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Transaction Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Sender
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Receiver
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2 text-sm text-gray-900">2024-12-20</td>
              <td className="px-4 py-2 text-sm text-gray-900">$250.00</td>
              <td className="px-4 py-2 text-sm text-gray-900">John Doe</td>
              <td className="px-4 py-2 text-sm text-gray-900">Jane Smith</td>
              <td className="px-4 py-2 text-sm text-gray-900">Completed</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2 text-sm text-gray-900">2024-12-18</td>
              <td className="px-4 py-2 text-sm text-gray-900">$500.00</td>
              <td className="px-4 py-2 text-sm text-gray-900">Alice Johnson</td>
              <td className="px-4 py-2 text-sm text-gray-900">Bob Brown</td>
              <td className="px-4 py-2 text-sm text-gray-900">Pending</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2 text-sm text-gray-900">2024-12-15</td>
              <td className="px-4 py-2 text-sm text-gray-900">$1,000.00</td>
              <td className="px-4 py-2 text-sm text-gray-900">Eve Davis</td>
              <td className="px-4 py-2 text-sm text-gray-900">Carlos Garcia</td>
              <td className="px-4 py-2 text-sm text-gray-900">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatementsPage;
