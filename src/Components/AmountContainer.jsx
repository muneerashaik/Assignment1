import { fetchTotalTransaction } from "./http";
import { useQuery } from "@tanstack/react-query";
export default function AmountContainer() {
  const {
    data: totalData,
    isPending: totalPending,
    isError: totalError,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: fetchTotalTransaction,
  });
  return (
    <div className="dash_amount">
      <div className="text-green-400 text-3xl font-bold">
        <div className="flex flex-col gap-1">
          {(totalData &&
            totalData.totals_credit_debit_transactions &&
            totalData.totals_credit_debit_transactions[1] &&
            totalData.totals_credit_debit_transactions[1].sum) ||
            0}
          {totalPending && <p className="text-xl">Loading...</p>}
          {totalError && (
            <p className="text-red-500 text-xl ">Fail to Fetch Data</p>
          )}
          <p className="text-base">Credit</p>
        </div>
        <img src="Credit.png" />
      </div>
      <div className="text-red-500 text-3xl font-bold">
        <div className="flex flex-col gap-1">
          {(totalData &&
            totalData.totals_credit_debit_transactions &&
            totalData.totals_credit_debit_transactions[0] &&
            totalData.totals_credit_debit_transactions[0].sum) ||
            0}
          {totalPending && <p className="text-xl">Loading...</p>}
          {totalError && (
            <p className="text-red-500 text-xl ">Fail to Fetch Data</p>
          )}
          <p className="text-base">Debit</p>
        </div>
        <img src="Debit.png" />
      </div>
    </div>
  );
}
