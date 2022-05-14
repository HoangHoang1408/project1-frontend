import { useQuery } from "@apollo/client";
import lodash from "lodash";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_ORDERS_QUERY } from "../../../apollo/query/getOrdersQuery";
import { loadingBlack } from "../../../images";
import {
  GetOrdersQuery,
  GetOrdersQueryVariables,
  GetOrdersQuery_getOrders_orders,
} from "../../../__generated__/GetOrdersQuery";
import { OrderStatus } from "../../../__generated__/globalTypes";
interface OrderStatusOptions {
  orderStatusOptions: (OrderStatus | string)[];
  status: string;
  setStatus: Dispatch<SetStateAction<OrderStatus | string>>;
}
const SelectOrderStatus: FC<OrderStatusOptions> = ({
  orderStatusOptions,
  status,
  setStatus,
}) => {
  const [statusOptionsOpen, setStatusOptionsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        statusOptionsOpen &&
        divRef.current &&
        !divRef.current.contains(e.target as Node)
      ) {
        setStatusOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [statusOptionsOpen]);
  return (
    <div
      ref={divRef}
      onClick={() => setStatusOptionsOpen((pre) => !pre)}
      className="relative w-fit select-none  cursor-pointer text-sm font-semibold"
    >
      <h1 className="w-full border-2 text-green-600 px-2 py-1 rounded border-green-500 transition">
        {status}
      </h1>
      {statusOptionsOpen && (
        <div className="absolute left-0 top-[105%] w-max text-center bg-white border-2 rounded border-green-500 flex flex-col space-y-1">
          {orderStatusOptions.map((status, i) => (
            <h1
              onClick={() => setStatus(status)}
              key={i}
              className="w-full hover:bg-green-500 text-slate-700 hover:text-white transition px-2 py-1"
            >
              {lodash.startCase(status)}
            </h1>
          ))}
        </div>
      )}
    </div>
  );
};
interface DateFilterInterface {
  from: Date | null;
  to: Date | null;
  setFrom: Dispatch<SetStateAction<Date | null>>;
  setTo: Dispatch<SetStateAction<Date | null>>;
}
const DateFilter: FC<DateFilterInterface> = ({ from, setFrom, setTo, to }) => {
  useEffect(() => {
    if (!from || !to) return;
    if (from > to) toast.error("Invalid To Date");
  }, [from, to]);
  return (
    <div className="flex space-x-2 items-center flex-wrap">
      <div className="border-2 border-green-500 rounded overflow-hidden">
        <input
          onChange={(e) => {
            setFrom(e.target.valueAsDate);
          }}
          type="date"
          className="border-none outline-none text-green-600 py-[0.1rem] px-[0.1rem] font-semibold text-sm rounded "
        />
      </div>
      <h1 className="text-slate-700 font-semibold">To</h1>
      <div className="border-2 border-green-500 rounded overflow-hidden">
        <input
          onChange={(e) => {
            setTo(e.target.valueAsDate);
          }}
          type="date"
          className="border-none outline-none text-green-600 py-[0.1rem] px-[0.1rem] font-semibold text-sm rounded "
        />
      </div>
    </div>
  );
};

interface OrderHistoryProps {
  orders: GetOrdersQuery_getOrders_orders[];
}
const OrdersHistory: FC<OrderHistoryProps> = ({ orders }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-1 w-full text-xs sm:text-sm md:text-base">
      <div className="grid grid-cols-12 gap-1 place-items-center p-1 bg-white text-center border border-slate-300 rounded font-semibold text-slate-700">
        <h1 className="col-span-1">Id</h1>
        <h1 className="col-span-4">Order Date</h1>
        <h1 className="col-span-1">Payment</h1>
        <h1 className="col-span-3">Status</h1>
        <h1 className="col-span-1">Total</h1>
        <h1 className="col-span-2">Action</h1>
      </div>
      {orders.map((order, i) => {
        const { id, createdAt, method, orderStatus, totalPrice } = order;
        return (
          <div
            key={i}
            className="grid grid-cols-12 gap-1 place-items-center p-2 bg-white text-center border border-slate-300 rounded transition hover:border-slate-500 text-green-600 font font-semibold hover:text-green-700"
          >
            <h1 className="col-span-1">#{id}</h1>
            <h1 className="col-span-4">
              {new Date(createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </h1>
            <h1 className="col-span-1">{method}</h1>
            <h1 className="col-span-3">{lodash.startCase(orderStatus)}</h1>
            <h1 className="col-span-1">{totalPrice}$</h1>
            <div className="col-span-2">
              <button
                onClick={() => navigate(`/orders/${id}`)}
                className="py-[0.1rem] px-2 bg-green-500 transition font-semibold rounded text-white hover:bg-green-600"
              >
                Detail
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// main component
const OrdersHistoryPage = () => {
  const { data, loading } = useQuery<GetOrdersQuery, GetOrdersQueryVariables>(
    GET_ORDERS_QUERY,
    {
      variables: {
        input: {
          orderStatus: null,
        },
      },
      fetchPolicy: "network-only",
      onCompleted(data) {
        if (data.getOrders.error) toast.error(data.getOrders.error);
      },
      onError() {
        toast.error("Something wrong happened. Please try again!");
      },
    }
  );
  const statusOptions = useMemo(
    () => [
      "All Orders",
      OrderStatus.PendingOrder,
      OrderStatus.RestaurantCooking,
      OrderStatus.DriverDelivering,
      OrderStatus.CustomerCancelled,
    ],
    []
  );
  const sourceOrders = useMemo(() => data?.getOrders.orders, [data]);
  const [status, setStatus] = useState<OrderStatus | string>(statusOptions[0]);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [orders, setOrders] = useState(sourceOrders);
  useEffect(() => {
    if (data?.getOrders.orders) setOrders(data.getOrders.orders);
  }, [data, setOrders]);
  useEffect(() => {
    setOrders(
      sourceOrders?.filter((order) => {
        if (from && to) {
          const createdDate = new Date(order.createdAt);
          return from <= createdDate && createdDate <= to;
        }
        return status === statusOptions[0] || order.orderStatus === status;
      })
    );
  }, [status, sourceOrders, from, to, statusOptions]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-6">
      <div className="w-full max-w-5xl flex flex-col space-y-3 bg-slate-50 p-2 rounded shadow">
        <h1 className="font-bold text-3xl text-green-600">Order History</h1>
        <div className="flex justify-between items-center flex-wrap">
          <SelectOrderStatus
            orderStatusOptions={statusOptions}
            setStatus={setStatus}
            status={status}
          />
          <DateFilter from={from} to={to} setFrom={setFrom} setTo={setTo} />
        </div>
        {!orders && loading && (
          <div className="w-full grid place-items-center">
            <img src={loadingBlack} alt="loading" />
          </div>
        )}
        {orders && <OrdersHistory orders={orders || []} />}
        {(!orders || orders?.length === 0) && !loading && (
          <div className="w-full text-center font-bold text-xl text-green-600">
            No order found!
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersHistoryPage;
