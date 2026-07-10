import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";

function CardExpenseBreakdown(props) {
  const { data } = props;

  return (
    <>
      <Card
        title="Expenses Breakdown"
        desc={
          <div className="h-full md:grid md:grid-cols-3 gap-6">
            {data.map((item) => (
              <div key={item.id} className="flex flex-col justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                {/* Bagian Atas: Info Kategori */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    <div>
                      <div className="bg-special-bg text-gray-02 px-3 py-5 rounded-lg flex flex-col place-content-center">
                        {item.icon}
                      </div>
                    </div>
                    <div className="ms-4">
                      <span className="text-gray-02">{item.category}</span>
                      <br />
                      <span className="font-bold text-lg">${item.amount}</span>
                      <div className="flex">
                        <span className="text-gray-02">{item.percentage}%*</span>{" "}
                        {item.arrow}
                      </div>
                    </div>
                  </div>
                  <div className="flex place-content-center flex-col me-2">
                    <Icon.ArrowRight />
                  </div>
                </div>

                {/* Bagian Bawah: Menampilkan Detail Transaksi Kasus Soal 3 */}
                <div className="space-y-2 border-t border-gray-100 pt-3">
                  {item.details && item.details.map((subItem, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-defaultBlack">{subItem.title}</p>
                        <p className="text-[10px] text-gray-03">{subItem.date}</p>
                      </div>
                      <p className="font-bold text-defaultBlack">${subItem.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      />
    </>
  );
}

export default CardExpenseBreakdown;