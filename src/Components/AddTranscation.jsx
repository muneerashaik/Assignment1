import Model from "../utils/Model";
import Input from "../utils/Input";
import { MdCancel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { handelAddTranscation } from "./http";
import { handelEditTranscation } from "./http";
import { queryClient } from "./http";
import dayjs from "dayjs";
import toast from "react-hot-toast";
export default function AddModel({ isOpen, type, handelFunction, data }) {
  let mutateFun = handelAddTranscation;
  if (type === "edit") {
    mutateFun = handelEditTranscation;
  }
  const { mutate } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transcationAll"],
      });
      handelFunction(type);
      toast.success(`${type === "add" ? "Added" : "Updated"} Sucessfully`);
    },
  });
  function handelAddEditData(event, id) {
    event.preventDefault();
    let data = new FormData(event.target);
    let formData = Object.fromEntries(data.entries());
    mutate({ data: formData, id: id });
  }
  return (
    <div>
      <Model isOpen={isOpen} style="InputModel modal p-5">
        <form
          className="p-6 flex flex-col gap-4"
          onSubmit={() => handelAddEditData(event, data.id)}
        >
          <div className="flex justify-between">
            <h3 className="font-bold text-2xl">Add Transcation</h3>

            <button
              type="button"
              onClick={() => handelFunction(type)}
              className="font-bold text-2xl"
            >
              <MdCancel />
            </button>
          </div>
          <p>Fill The Transcation Details</p>
          <Input
            labelname="Transaction Name"
            type="text"
            id="transactionName"
            name="name"
            placeholder="Transaction Name"
            defaultValue={data ? data.transaction_name : ""}
          />
          <div className=" flex flex-col gap-1">
            <label htmlFor="type">Transcation Type</label>
            <select
              id="type"
              name="type"
              defaultValue={data ? data.type : ""}
              required
            >
              <option value="">Select Transcation Type</option>
              <option value="credit">credit</option>
              <option value="debit">debit</option>
            </select>
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="category">Transcation Category</label>
            <select
              id="category"
              name="category"
              required
              defaultValue={data ? data.category : ""}
            >
              <option value="">Select</option>
              <option value="Shopping">Shopping</option>
              <option value="Transfer">Transfer</option>
              <option value="Service">Servics</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <Input
            labelname="Amount"
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            defaultValue={data ? data.amount : ""}
          />
          <Input
            labelname="Date"
            type="date"
            id="date"
            name="date"
            placeholder="Date"
            defaultValue={data ? dayjs(data.date).format("DD/MM/YYYY") : ""}
          />
          <button className="bg-blue-600 p-2 text-white font-bold rounded-lg">
            Add Transcations
          </button>
        </form>
      </Model>
    </div>
  );
}
