"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Select from "@/app/login/Select";
import logo from "@/assets/logo.svg";
import { useCurrentUser } from "@/app/userContext";

const Login = () => {
  const [selectedUser, updateSelectedUser] = useState({});
  const router = useRouter();
  const { state, dispatch } = useCurrentUser();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users").then((res) =>res.json())
    .then((response) => {
      setUsers(response.data)
      updateSelectedUser(response.data[0]);
      setIsLoading(false);
    })
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          priority
          src={logo}
          alt="Parallax"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          {isLoading ? (
            <div
              className="center w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent shadow-md m-auto"
            ></div>
          ) : (
            <Select
              selectedUser={selectedUser}
              updateSelectedUser={updateSelectedUser}
              users={users}
            />
          )}
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled"
              disabled={isLoading}
              onClick={() => {
                dispatch({ type: "set", payload: selectedUser });
                router.push("/home");
              }}
            >
              Sign in
            </button>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t see your email address?{" "}
          <a
            href="https://tally.so/r/3lG0Vm"
            target="_blank"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Join the waitlist
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
