import React from "react";
import Head from "next/head";

import { Table, IColumnType } from "@/components";
import { cn } from "@/utils/style";
import { IUserType } from "@/types/user";

const columns: IColumnType<IUserType>[] = [
  { key: "id", title: "Id" },
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  {
    key: "gender",
    title: "Gender",
    render: (_, { gender }) => (
      <span className={cn("capitalize")}>{gender}</span>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (_, { status }) => (
      <span className={cn("capitalize")}>{status}</span>
    ),
  },
];

const Users = () => {
  const users = [
    {
      id: 5184389,
      name: "Ganapati Nehru",
      email: "nehru_ganapati@buckridge.example",
      gender: "female",
      status: "active",
    },
    {
      id: 5184388,
      name: "Mrs. Vaidehi Tandon",
      email: "mrs_vaidehi_tandon@nikolaus.test",
      gender: "female",
      status: "inactive",
    },
  ];

  return (
    <>
      <Head>
        <title>All User - Postrest.</title>
        <meta
          name="description"
          content="a collection of post from https://gorest.co.in/ api"
        />
      </Head>

      <div>
        <div className={cn("mb-14")}>
          <p
            className={cn(
              "text-5xl font-bold leading-tight tracking-wide mb-4"
            )}
          >
            All User
          </p>
          <p
            className={cn(
              "text-lg font-normal leading-loose tracking-wider text-neutral-700"
            )}
          >
            Collection of users from https://gorest.co.in/ api.
          </p>
        </div>

        <div className={cn("mb-10")}>
          <Table data={users} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Users;