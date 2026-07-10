import React, { useState, useEffect, useContext } from 'react';
import MainLayout from '../components/Layouts/MainLayout'
import CardBalance from '../components/Fragments/CardBalance'
import CardGoal from '../components/Fragments/CardGoal'
import CardUpcomingBill from '../components/Fragments/CardUpcomingBill'
import CardRecentTransaction from '../components/Fragments/CardRecentTransaction'
import CardStatistic from '../components/Fragments/CardStatistic'
import CardExpenseBreakdown from '../components/Fragments/CardExpenseBreakdown'
import { transactions, bills, expensesBreakdowns, balances, goals, expensesStatistics, } from "../data";
import { goalService } from '../services/dataService'
import { AuthContext } from '../context/authContext'
import AppSnackbar from '../components/Elements/AppSnackbar';

function dashboard() {
  const [goals, setGoals] = useState({});
  // HANYA MENAMBAHKAN INI: Mengambil fungsi logout dari AuthContext bawaan dosen agar catch block tidak error
  const { logout } = useContext(AuthContext); 

  const fetchGoals = async () => {
    try {
      const data = await goalService();
      setGoals(data);
    } catch (err) {
      console.error("Gagal mengambil data goals:", err);
      if (err.status === 401) {
        logout();
      }
    }
  };

  // KODE DIBERSIHKAN DARI DUPLIKAT: Cukup satu useEffect untuk memanggil data saat pertama kali render
  useEffect(() => {
    fetchGoals();
  }, []);
  
  console.log(goals);

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
            <CardUpcomingBill data={bills} />
          </div>
            <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            <CardStatistic />
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