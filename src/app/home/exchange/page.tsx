"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import Confirm from "@/app/home/exchange/Confirm";
import usdImage from "@/assets/usd.png";
import phpImage from "@/assets/php.png";
import iconArrowdown from "@/assets/arrowdown.svg";
import { useCurrentUser } from "@/app/userContext";

type StateQuote = {
  id: string | null
  rate: number | null
};

const Home = () => {
  const [quote, setQuote] = useState<StateQuote>({ id: null, rate: null});
  const [from, setFrom] = useState(1);
  const [submittedOrderId, setSubmittedOrderId] = useState(null);
  const [to, setTo] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { state: currentUser } = useCurrentUser();
  
  useEffect(() => {
    if (currentUser.id) {
      fetch("/api/quotes", {
        method: "POST",
      }).then((resp) => {
        return resp.json()
      }).then((response) => {
        setQuote(response.data);
      });
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (quote.rate) {
      const from = 1;
      const to = quote.rate * from;
      setFrom(from);
      setTo(to);
    }
  }, [quote?.rate]);

  function onChangeFrom(e: React.ChangeEvent<HTMLInputElement>) {
    if (quote.rate) {
      const value = e.target.value.length ? parseInt(e.target.value) : 0;
      setFrom(value);
      const to = value * quote.rate;
      setTo(to);
    }
  }

  function onChangeTo(e: React.ChangeEvent<HTMLInputElement>) {
    if (quote.rate) {
      const value = e.target.value.length ? parseInt(e.target.value) : 0;
      setTo(value);
      const from = value / quote.rate;
      setFrom(from);
    }
  }

  function onSubmit() {
    if (quote.id && currentUser.id) {
      setIsSubmitting(true);
      setSubmittedOrderId(null);
      fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          quote_id: quote.id,
          user_id: currentUser.id,
          from_amount: from,
        }),
      }).then((res) => {
        return res.json()
      }).then((response) => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setSubmittedOrderId(response.data.id);
      });
    }
  }

  function setIsConfirmOpenHandler(bool: boolean) {
    setIsConfirmOpen(bool);
    if (!bool) {
      setIsSubmitted(false);
    }
  }

  const isSubmitDisabled = !quote.id || from <= 0 || to <= 0;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8">
      <Confirm
        isOpen={isConfirmOpen}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        setIsOpen={setIsConfirmOpenHandler}
        to={to}
        from={from}
        onSubmit={onSubmit}
        submittedOrderId={submittedOrderId}
      />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 rounded-sm border-solid bg-white p-4 flex flex-col text-black">
        <div className="flex flex-col">
          <div className="flex">
            <span className="flex flex-col mb-4 mr-4 w-2/4">
              <label htmlFor="from">From Amount</label>
              <input
                id="from"
                type="number"
                value={from}
                onChange={(e) => onChangeFrom(e)}
              ></input>
            </span>
            <span className="flex justify-between flex-grow">
              <p className="self-center">USD</p>
              <Image
                priority
                src={usdImage}
                alt="usd"
                className="h-8 w-8 rounded-full ring-0 ring-white self-center"
              />
            </span>
          </div>
          <Image
            priority
            src={iconArrowdown}
            alt="arrow-down"
            className="self-center my-1"
          />
          <div className="flex">
            <span className="flex flex-col mb-4 mr-4 w-2/4">
              <label htmlFor="to"> To Amount</label>
              <input
                id="to"
                type="number"
                value={to}
                onChange={(e) => onChangeTo(e)}
              ></input>
            </span>
            <span className="flex justify-between flex-grow">
              <p className="self-center">PHP</p>
              <Image
                priority
                src={phpImage}
                alt="php"
                className="inline-block h-8 w-8 rounded-full ring-0 ring-white self-center justify-self-center"
              />
            </span>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          {!quote.rate ? (
            <div
              className="center w-12 h-12 rounded-full animate-spin
                          border-2 border-solid border-blue-500 border-t-transparent shadow-md m-auto mb-4"
            ></div>
          ) : (
            <>
              <span>Live Exchange Rate:</span>
              <span>{quote.rate}</span>
            </>
          )}
        </div>
        <button
          className="text-center border-solid border-2 border-green-500 rounded-md leading-loose mt-4"
          disabled={isSubmitDisabled}
          type="button"
          onClick={() => setIsConfirmOpen(true)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
