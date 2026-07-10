import React from 'react'
import Card from '../Elements/Card';

function CardStatistic(props) {
  const { data } = props;

  // Membuat visualisasi diagram batang dinamis berdasarkan data expensesStatistics
  const statisticContent = (
    <div className="h-full min-h-45 flex flex-col justify-between">
      {/* Bagian Atas: Keterangan Warna Bar */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-gray-03 flex items-center gap-4 ms-auto">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-gray-200 rounded-sm inline-block"></span> 
            This Week
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-primary rounded-sm inline-block"></span> 
            Last Week
          </span>
        </span>
      </div>
      
      {/* Bagian Utama: Render Diagram Batang Berdampingan */}
      <div className="flex items-end justify-between h-36 pt-2 px-2 gap-2">
        {data && data.map((item) => {
          // Normalisasi tinggi bar secara aman berdasarkan perbandingan nilai
          const maxAmount = 250000;
          const heightThisWeek = Math.min((item.amountThisWeek / maxAmount) * 100, 100);
          const heightLastWeek = Math.min((item.amountLastWeek / maxAmount) * 100, 100);

          return (
            <div key={item.id} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
              <div className="w-full flex items-end justify-center gap-1 h-24">
                {/* Bar This Week */}
                <div 
                  className="w-3 bg-gray-200 rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.max(heightThisWeek, 15)}%` }}
                ></div>
                {/* Bar Last Week */}
                <div 
                  className="w-3 bg-[#299D91] rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.max(heightLastWeek, 10)}%` }}
                ></div>
              </div>
              {/* Label Hari */}
              <span className="text-[10px] text-gray-03 font-medium whitespace-nowrap">{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <Card
        title="Statistics"
        desc={statisticContent}
      />
    </>
  )
}

export default CardStatistic;