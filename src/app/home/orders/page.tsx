"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import iconCompleted from "@/assets/completed.svg";
import iconFailed from "@/assets/failed.svg";
import usdImage from "@/assets/usd.png";
import phpImage from "@/assets/php.png";
import { useCurrentUser } from "@/app/userContext";

type Order = {
  id: string
  from_amount: number
  status: "failed" | "completed"
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state: currentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (currentUser.id) {
      fetch(`/api/orders?user_id=${currentUser.id}`)
       .then((response) => { return response.json() })
       .then((response) => {
         setOrders(response.data);
         setIsLoading(false);
     })
    }
  }, [currentUser.id]);

  if (isLoading) {
    return (
      <div
        className="center w-12 h-12 rounded-full animate-spin
              border-2 border-solid border-blue-500 border-t-transparent shadow-md m-auto mt-16"
      ></div>
    );
  }
  return (
    <>
    <table className="table-auto bg-white text-black mt-10 justify-center sm:mx-auto min-w-full border-2 border-black border-solid rounded border-collapse border border-slate-400 border-spacing-4">
      <thead className="text-left">
        <tr>
          <th className="border border-slate-300 pl-4">From amount</th>
          <th className="border border-slate-300 pl-4">From currency</th>
          <th className="border border-slate-300 pl-4">To currency</th>
          <th className="border border-slate-300 pl-4">Status</th>
          <th className="border border-slate-300 pl-4"></th>
        </tr>
      </thead>
      {
        orders.length ? (
          <tbody>
            {
              orders.map((order) => {
                return (
                <tr
                  key={order.id}
                  className="space-y-8 cursor-pointer"
                  onClick={() => {
                    router.push(`/home/orders/${order.id}`);
                  }}
                  style={{
                    lineHeight: 4,
                  }}
                >
                  <td className="border border-slate-300 pl-4">
                    {order.from_amount}
                  </td>
                  <td className="border border-slate-300 pl-4">
                    <Image
                      priority
                      src={usdImage}
                      alt="usd"
                      className="inline-block h-8 w-8 rounded-full ring-0 ring-white"
                    />
                  </td>
                  <td className="border border-slate-300 pl-4">
                    <Image
                      priority
                      src={phpImage}
                      alt="php"
                      className="inline-block h-8 w-8 rounded-full ring-0 ring-white"
                    />
                  </td>
                  <td className="border border-slate-300 pl-4">
                    {order.status === "failed" ? (
                      <Image
                        priority
                        src={iconFailed}
                        alt="failed"
                        className="inline-block h-8 w-8 rounded-full ring-0 ring-white"
                      />
                    ) : (
                      <Image
                        priority
                        src={iconCompleted}
                        alt="completed"
                        className="inline-block h-8 w-8 rounded-full ring-0 ring-white"
                      />
                    )}
                  </td>
                  <td className="border border-slate-300 pl-4">
                    <Link className="underline" href={`/home/orders${order.id}}`}>
                      View Order
                    </Link>
                  </td>
                </tr>
                )
              })
            }
          </tbody>
        ) : null
      }
    </table>
    {
      !orders.length && !isLoading ?
      <div className="min-w-full justify-center sm:mx-auto text-center mt-10">Get start and exchange <Link className="underline" href="/home/exchange"> here</Link> </div> : null
    }
    </>
  );
};

export default Orders;
