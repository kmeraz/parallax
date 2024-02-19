"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import iconRefresh from "@/assets/refresh.svg";

type StateOrder = {
  id: string | null;
  from_amount: string | null
  status: string | null
}

const Order = () => {
  const pathname = usePathname();
  const router = useRouter();
  const pathArr = pathname.split("/");
  const orderId = pathArr[pathArr.length - 1];
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<StateOrder>({
    id: null,
    from_amount: null,
    status: null
  });

  useEffect(() => {
    fetch(`/api/orders/${orderId}`).then((response) => {
      return response.json()
    }).then((response) => {
      setOrder(response.data);
      setIsLoading(false);
    });
  }, [orderId]);

  return (
    <div>
      <div className="px-4 sm:px-0 flex">
        <span className="mr-10">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Order Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Currency Exchange
          </p>
        </span>
        <button onClick={() => router.refresh()} className="flex items-center">
          <p className="mr-4 border-solid border-2 rounded border-black p-2">
            Refresh
          </p>
           <Image priority src={iconRefresh} alt="refresh"/>
        </button>
      </div>
      {isLoading ? (
        <div
          className="center w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent shadow-md m-auto mt-16"
        ></div>
      ) : (
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Order ID
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order?.id}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                From Amount
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order?.from_amount}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Order Status
              </dt>
              {order?.status ? (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {order.status.toUpperCase()}
                </dd>
              ) : null}
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Order;
