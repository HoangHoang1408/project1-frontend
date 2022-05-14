import { useQuery } from "@apollo/client";
import { FC, Fragment } from "react";
import { useParams } from "react-router-dom";
import { GET_ORDER_DETAIL_QUERY } from "../../../apollo/query/getOrderDetailQuery";
import { OrderAction } from "../../../components/Customer/OrderHistoryDetailPage/OrderAction";
import { OrderInfo } from "../../../components/Customer/OrderHistoryDetailPage/OrderInfo";
import { OrderItems } from "../../../components/Customer/OrderHistoryDetailPage/OrderItems";
import { loadingBlack } from "../../../images";
import {
  GetOrderDetailQuery,
  GetOrderDetailQueryVariables,
} from "../../../__generated__/GetOrderDetailQuery";

const OrderHistoryDetailPage: FC = () => {
  const param = useParams<{ orderId: string }>();
  const { data, loading } = useQuery<
    GetOrderDetailQuery,
    GetOrderDetailQueryVariables
  >(GET_ORDER_DETAIL_QUERY, {
    variables: {
      input: {
        orderId: +(param.orderId as string),
      },
    },
  });
  const order = data?.getOrder.order;
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-6 bg-slate-50">
      <div className="w-full max-w-4xl flex flex-col items-center space-y-6 bg-white p-2 sm:p-5 md:p-8 rounded shadow ">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-green-500">Order detail</h1>
        </div>
        {loading && (
          <div className="w-full grid place-items-center">
            <img src={loadingBlack} alt="Loading" />
          </div>
        )}
        {!loading && !order && (
          <div className="flex flex-col space-y-3">
            <h1 className="text-green-500 font-bold text-xl">
              Some thing wrong happened!
            </h1>
            <h1 className="text-slate-700 font-semibold">Order not found</h1>
          </div>
        )}
        {!loading && order && (
          <Fragment>
            <OrderInfo order={order} />
            <OrderItems order={order} restaurantId={order.restaurant?.id} />
            <OrderAction
              status={order.orderStatus}
              order={order}
              restaurantId={order.restaurant?.id}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryDetailPage;
