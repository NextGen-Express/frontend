import React, { useState } from "react";
import { Table } from "antd";

const OrderTable = ({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const columns = [
    {
      title: "Order_id",
      dataIndex: "orderId",
    },
    {
      title: "Carrier_id",
      dataIndex: "carrierId",
    },
    {
      title: "Picup_Addr",
      dataIndex: "pickup",
    },
    {
      title: "Destinaton_Addr",
      dataIndex: "dest",
    },
    {
      title: "Order_Time",
      dataIndex: "orderTime",
    },
    {
      title: "Estimated_Pickup_Time",
      dataIndex: "pickupTime",
    },
    {
      title: "Estimated_Delivery_Time",
      dataIndex: "deliveryTime",
    },
    {
      title: "Price(USD)",
      dataIndex: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};

export default OrderTable;
