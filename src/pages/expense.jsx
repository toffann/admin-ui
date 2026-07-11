import React, { useState, useEffect, useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import CardExpenseBreakdown from "../components/Fragments/CardExpenseBreakdown";
import { expensesBreakdowns, transactions } from "../data"; 
import { AuthContext } from "../context/authContext";

function ExpensePage() {
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const mappedData = expensesBreakdowns.map((category) => {
        const matchedTransactions = transactions
          .filter((trx) => trx.categoryId === category.id && trx.type === "Expense")
          .map((trx) => ({
            title: trx.transactionName,
            date: "17 May 2023", 
            amount: trx.amount,
          }));

        return {
          ...category,
          details: matchedTransactions.length > 0 ? matchedTransactions : [
            { title: "House Rent", date: "17 May 2023", amount: category.amount - 20 },
            { title: "Parking", date: "17 May 2023", amount: 20 }
          ],
        };
      });

      setExpensesData(mappedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <MainLayout>
       
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-03">Expenses Comparison</h1>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-xs text-primary mt-2 font-medium">Loading Data</p>
          </div>
        ) : (
          <div className="[&_>_div_>_div]:items-start">
          <CardExpenseBreakdown data={expensesData} />
</div>
        )}
      </MainLayout>
    </>
  );
}

export default ExpensePage;