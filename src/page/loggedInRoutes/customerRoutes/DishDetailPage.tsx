import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_DISH_DETAIL_BY_SLUG } from "../../../apollo/query/getDishDetailBySlugQuery";
import Loading from "../../../components/layout/Loading";
import {
  GetDishDetailBySlug,
  GetDishDetailBySlugVariables,
} from "../../../__generated__/GetDishDetailBySlug";

const DishDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams<{ dishSlug: string }>();
  const [getDish, { data: getDishData, loading: getDishLoading }] =
    useLazyQuery<GetDishDetailBySlug, GetDishDetailBySlugVariables>(
      GET_DISH_DETAIL_BY_SLUG,
      {
        onCompleted(data) {
          const error = data.getDishDetailBySlug.error?.message;
          if (error) return toast.error(error);
        },
        onError() {
          return toast.error("Can not load dish. Please try again later!");
        },
      }
    );
  useEffect(() => {
    if (!params.dishSlug) {
      navigate("/");
      return;
    }
    getDish({
      variables: {
        input: {
          slug: params.dishSlug,
        },
      },
    });
  }, [params, navigate, getDish]);
  if (getDishLoading) return <Loading />;
  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-6 bg-slate-50">
      Hello from hoang
    </div>
  );
};

export default DishDetailPage;
