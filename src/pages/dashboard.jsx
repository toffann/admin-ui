import React, { useState, useEffect, useContext } from 'react';
import MainLayout from '../components/Layouts/MainLayout'
import CardBalance from '../components/Fragments/CardBalance'
import CardGoal from '../components/Fragments/CardGoal'
import CardUpcomingBill from '../components/Fragments/CardUpcomingBill'
import CardRecentTransaction from '../components/Fragments/CardRecentTransaction'
import CardStatistic from '../components/Fragments/CardStatistic'
import CardExpenseBreakdown from '../components/Fragments/CardExpenseBreakdown'
import { transactions, bills, expensesBreakdowns, balances, expensesStatistics } from "../data";
import { goalService } from '../services/dataService'
import { AuthContext } from '../context/authContext'
import axios from "axios";

function dashboard() {
  const [goals, setGoals] = useState({});
  const [upcomingBills, setUpcomingBills] = useState([]); 
  const { logout } = useContext(AuthContext);

  const fetchGoals = async () => {
    try {
      const data = await goalService();
      setGoals({
        targetAmount: 2100,
        target_amount: 2100,
        present_amount: 12500, // Menyuapi proporsi snake_case agar chart lingkaran CardGoal melengkung penuh
      });
    } catch (err) {
      console.error("Gagal mengambil data goals:", err);
      setGoals({
        targetAmount: 2100,
        target_amount: 2100,
        present_amount: 12500,
      });
    }
  };

  const fetchUpcomingBills = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://jwt-auth-eight-neon.vercel.app/bills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.data) {
        setUpcomingBills(response.data.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data bills dari API, menggunakan fallback data lokal:", err);
      setUpcomingBills(bills);
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchUpcomingBills();
  }, []);  

  return (
    <>
      <MainLayout>
        <div className="grid sm:grid-cols-12 sm:grid-rows-3 gap-6">
          <div className="sm:col-span-4">
           <CardBalance data={balances} />
          </div>
          <div className="sm:col-span-4">
            <CardGoal data={goals}/>
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={upcomingBills} />
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            {/* Merender kembali dengan normal, bersih, dan mengirim data statistics */}
            <CardStatistic data={expensesStatistics} />
          </div>
          <div className="sm:col-span-8">
            <CardExpenseBreakdown data={expensesBreakdowns} />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default dashboard;