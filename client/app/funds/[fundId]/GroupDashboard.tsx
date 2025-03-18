"use client";
import { Group, Member, Transaction } from "@/lib/schemas";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CollectiveBudget = ({
  group,
  transactions,
  members,
}: {
  group: Group;
  transactions: Transaction[];
  members: Member[];
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Calculate contribution percentages
  const contributionData = members.map((member) => ({
    name: member.name,
    value: member.totalContribution,
    color: member.color,
  }));

  // Calculate spending by category
  const categorySpending = [
    { name: "Groceries", amount: 350 },
    { name: "Utilities", amount: 220 },
    { name: "Rent", amount: 1200 },
    { name: "Entertainment", amount: 180 },
    { name: "Other", amount: 150 },
  ];

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{group.name}</h1>
        <p className="text-gray-600">{group.description}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm font-medium">Group Balance</h2>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(group.balance)}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm font-medium">Monthly Budget</h2>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(group.monthlyBudget)}
          </p>
          <div className="w-full bg-gray-200 rounded h-2 mt-2">
            <div
              className="h-2 rounded bg-blue-500"
              style={{
                width: `${Math.min(
                  (group.spent / group.monthlyBudget) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm font-medium">Members</h2>
          <p className="text-2xl font-bold text-gray-800">{members.length}</p>
          <div className="flex mt-2">
            {members.slice(0, 3).map((member, idx) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center -ml-2 first:ml-0 border-2 border-white text-xs font-medium"
                style={{ backgroundColor: member.color }}
              >
                {member.name.charAt(0)}
              </div>
            ))}
            {members.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center -ml-2 border-2 border-white text-xs">
                +{members.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "transactions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("balances")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "balances"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Balances
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "settings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Contribution Chart */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-gray-700 font-medium mb-4">Contributions</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {contributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color || COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Spending by Category */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-gray-700 font-medium mb-4">
                Spending by Category
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categorySpending}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Bar dataKey="amount" fill="#8884d8">
                      {categorySpending.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Group Activity */}
          <div className="bg-white rounded shadow p-4 mb-6">
            <h2 className="text-gray-700 font-medium mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    {transaction.member.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-800">
                        {transaction.member} {transaction.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {transaction.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Expense Button */}
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg">
              Add New Expense
            </button>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Paid By
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
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.member}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-800">
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "balances" && (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-gray-700 font-medium mb-6">Member Balances</h2>

          <div className="space-y-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <span className="font-medium">{member.name}</span>
                  </div>
                  <div
                    className={`text-lg font-medium ${
                      member.balance > 0
                        ? "text-green-600"
                        : member.balance < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {formatCurrency(member.balance)}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {member.balance > 0
                    ? `${member.name} is owed money from the group`
                    : member.balance < 0
                    ? `${member.name} owes money to the group`
                    : `${member.name} is settled up`}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-gray-700 font-medium mb-4">Settlement Plan</h3>
            <div className="space-y-3">
              {/* Calculate and display actual settlement suggestions */}
              {calculateSettlementPlan(members).map((settlement, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <p className="text-sm">
                    {settlement.from} should pay{" "}
                    {formatCurrency(settlement.amount)} to {settlement.to}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-gray-700 font-medium mb-6">Group Settings</h2>

          <div className="space-y-6">
            {/* Group Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                defaultValue={group.name}
              />
            </div>

            {/* Group Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                defaultValue={group.description}
              />
            </div>

            {/* Monthly Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Budget
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                defaultValue={group.monthlyBudget}
              />
            </div>

            {/* Members */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Members
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  + Add Member
                </button>
              </div>
              <div className="border border-gray-200 rounded overflow-hidden">
                {members.map((member, idx) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-3 ${
                      idx !== members.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white text-xs"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <span>{member.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">
                        {member.email}
                      </span>
                      <button className="text-gray-400 hover:text-red-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transparency Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transparency Settings
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="full"
                    name="transparency"
                    className="h-4 w-4 text-blue-600"
                    defaultChecked={group.transparency === "full"}
                  />
                  <label htmlFor="full" className="ml-2 text-sm text-gray-700">
                    Full transparency (all members see all transactions)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="limited"
                    name="transparency"
                    className="h-4 w-4 text-blue-600"
                    defaultChecked={group.transparency === "limited"}
                  />
                  <label
                    htmlFor="limited"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Limited (members only see their own transactions)
                  </label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Expense Categories
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  + Add Category
                </button>
              </div>
              <div className="border border-gray-200 rounded overflow-hidden">
                {categorySpending.map((category, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 ${
                      idx !== categorySpending.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <span>{category.name}</span>
                    <button className="text-gray-400 hover:text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save/Delete Buttons */}
            <div className="flex justify-between mt-8">
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Delete Group
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate settlement plan
const calculateSettlementPlan = (members: Member[]) => {
  // Create a copy of members to avoid mutating the original array
  const membersCopy = [...members];

  // Sort members by balance (descending)
  membersCopy.sort((a, b) => b.balance - a.balance);

  const settlements = [];

  // Find all members who are owed money (positive balance)
  const creditors = membersCopy.filter((m) => m.balance > 0);
  // Find all members who owe money (negative balance)
  const debtors = membersCopy.filter((m) => m.balance < 0);

  // Match debtors with creditors
  for (const debtor of debtors) {
    let remainingDebt = Math.abs(debtor.balance);

    for (let i = 0; i < creditors.length && remainingDebt > 0; i++) {
      const creditor = creditors[i];

      if (creditor.balance <= 0) continue;

      const amount = Math.min(remainingDebt, creditor.balance);

      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: amount,
      });

      // Update balances
      remainingDebt -= amount;
      creditor.balance -= amount;
    }
  }

  return settlements;
};

export default CollectiveBudget;
