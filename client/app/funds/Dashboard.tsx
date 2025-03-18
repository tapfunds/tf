"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Account, Budget, Group, Transaction, User } from "@/lib/schemas";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = ({
  user,
  accounts,
  transactions,
  budgets,
  groups,
}: {
  user: User;
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  groups: Group[];
}) => {
  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Prepare data for spending by category chart
  const categoryData = {
    labels: [
      "Food",
      "Housing",
      "Transport",
      "Entertainment",
      "Utilities",
      "Other",
    ],
    datasets: [
      {
        label: "Spending by Category",
        data: [450, 1200, 300, 200, 150, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for cash flow chart
  const cashFlowData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [3500, 3500, 3700, 3500, 3500, 4000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Expenses",
        data: [2300, 2800, 2400, 2600, 2300, 3000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Budget progress calculation
  const calculateBudgetProgress = (budget: Budget) => {
    return (budget.spent / budget.limit) * 100;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user.firstname}
        </h1>
        <p className="text-gray-600">
          Here's your financial overview as of today
        </p>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm font-medium">Total Balance</h2>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(totalBalance)}
          </p>
          <p className="text-sm text-gray-500">
            Across {accounts.length} accounts
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm font-medium">
            Monthly Spending
          </h2>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(2400)}
          </p>
          <p className="text-sm text-green-500">5% less than last month</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm font-medium">Shared Expenses</h2>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(850)}
          </p>
          <p className="text-sm text-gray-500">Across {groups.length} groups</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-medium mb-4">Cash Flow</h2>
          <Bar
            data={cashFlowData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-medium mb-4">
            Spending by Category
          </h2>
          <Doughnut
            data={categoryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-6">
        <h2 className="text-gray-700 font-medium mb-4">Budget Progress</h2>
        <div className="bg-white p-4 rounded shadow">
          {budgets.map((budget) => (
            <div key={budget.id} className="mb-4 last:mb-0">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">{budget.name}</span>
                <span className="text-gray-600">
                  {formatCurrency(budget.spent)} of{" "}
                  {formatCurrency(budget.limit)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className={`h-2 rounded ${
                    calculateBudgetProgress(budget) > 90
                      ? "bg-red-500"
                      : calculateBudgetProgress(budget) > 75
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(calculateBudgetProgress(budget), 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mb-6">
        <h2 className="text-gray-700 font-medium mb-4">Recent Transactions</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {transaction.merchant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.date}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                      transaction.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collective Budgets */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-700 font-medium">Your Groups</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Create New Group
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div key={group.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-medium text-gray-800 mb-2">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {group.members.length} members
              </p>
              <div className="flex justify-between mb-4">
                <span className="text-sm text-gray-600">Group Balance</span>
                <span className="text-sm font-medium text-gray-800">
                  {formatCurrency(group.balance)}
                </span>
              </div>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
